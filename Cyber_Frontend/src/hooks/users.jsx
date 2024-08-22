import { getClientes, doAssignment } from "../api/clientes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useGetClientes = () => {
    return useQuery({
        queryKey: ["getClientes"],
        queryFn: () => getClientes(),
        // staleTime: 5000,
      });
};

export const useDoAssignment= () => {
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