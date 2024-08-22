import { getClientes, doAssignment, updateClient } from "../api/clients";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetClientes = (page, rowsPerPage) => {
  return useQuery({
    queryKey: ["clients", page, rowsPerPage],
    queryFn: () => getClientes(page, rowsPerPage),
  });
};

export const useUpdateClientMutation = () => {
  return useMutation({
    mutationFn: (data) => updateClient(data.userID, data.data),
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
