import api from "@/config/axios";
import type { EmployeeSimpleResponse } from "@/types/business.types";

export const employeeService = {
    async getBusinessEmployees() : Promise<EmployeeSimpleResponse[]> {
        const response = await api.get<EmployeeSimpleResponse[]>("/employee/business")

        return response.data;
    }
} 