import { getClientes, doAssignment, updateClient, deleteClient, getAllAsignments } from "../api/clients";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useGlobalToast } from "../store/useGlobalStore";

export const useGetClientes = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClientes(),
  });
};

export const useAllAsignments = (rowsPerPage, page) => {
  return useQuery({
    queryKey: ["assignments", rowsPerPage, page],
    queryFn: () => getAllAsignments(rowsPerPage, page),
    placeholderData: keepPreviousData,
  })
}

export const useUpdateClientMutation = () => {
  return useMutation({
    mutationFn: (data) => updateClient(data.userID, data.data),
  })
}

export const useDeleteClientMutation = (userID) => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useGlobalToast();

  return useMutation({
    mutationFn: () => deleteClient(userID),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients']
      })
      openSnackbar("Cliente eliminado correctamente", "success", "bottom", "right");
    },
    onError: (error) => {
      openSnackbar(`${error}`, "error", "top", "center");
      console.error(error);
    }
  })
}

export const useDoAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doAssignment(data),
    onSuccess: (data) => {
      // queryClient.invalidateQueries("paciente");
      if (data === "ok") {
        console.log("Cliente asignado exitosamente");
        queryClient.invalidateQueries("getClientes");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
