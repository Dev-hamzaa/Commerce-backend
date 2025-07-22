export const baseCreate = async <T>(
    model: { create: (payload: T) => Promise<any> },
    payload: T
): Promise<any> => {
    try {
        const result = await model.create(payload);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, data: error };
    }
};


export const baseUpdate = async (
    model: { findByIdAndUpdate: (id: string, update: any, options?: any) => Promise<any> },
    id: string,
    payload: any
): Promise<any> => {
    try {
        const response = await model.findByIdAndUpdate(id, payload, { new: true });
        return { data: response, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
};

export const baseDelete = async (
    model: { findByIdAndDelete: (id: string) => Promise<any> },
    id: string
): Promise<any> => {
    try {
        const response = await model.findByIdAndDelete(id);
        return { data: response, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
};
export const baseGet = async () => {
    try {




        const result = {}
        return { data: result, error: null }
    } catch (error) {
        console.error(error)
        return { data: null, error }
    }
}