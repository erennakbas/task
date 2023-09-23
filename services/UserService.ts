
const getAll = async (params: any) => {
    const limit = String(params.rows);
    const skip = String(params.page*params.rows)
    const queryParams = new URLSearchParams({limit, skip});
    const res = await fetch(`https://dummyjson.com/users?${queryParams.toString()}`)
    const json = await res.json();
    return json;
}


const UserService = { getAll };

export default UserService;