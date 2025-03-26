import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAuthGoogle = () =>{
    return useQuery({
        queryKey: ["getUser"],
        queryFn: async () =>
          await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/success`, {
              withCredentials: true,
            })
            .then((res) => res.data),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}