import { getPulseras, createPulsera } from "../api/pulseras";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useGetPulseras = () => {
    return useQuery({
        queryKey: ["getPulseras"],
        queryFn: () => getPulseras(),
        // staleTime: 5000,
      });
};

export const useCreatePulsera= () => {
    const queryClient = useQueryClient();
  

    return useMutation({
        mutationFn: () => createPulsera(),
        onSuccess: () => {
         
        
            console.log("Pulsera Creada exitosamente");
            queryClient.invalidateQueries({queryKey: ["getPulseras"]});
        
        },
        onError: (error) => {
          console.log(error);
        },
      });
};