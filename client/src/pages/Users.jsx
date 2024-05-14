import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`,
                    {
                        withCredentials: true,
                    }
                );
                setUsers(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error.response);
                setError(error.response.status);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen h-full bg-gray-100">
            <div className="max-w-[1235px] mx-auto w-full h-full px-6">
                {loading ? (
                    <div className="w-full min-h-screen flex items-center justify-center">
                        <p className="text-lg font-medium text-gray-600">
                            Loading...
                        </p>
                    </div>
                ) : (
                    <>
                        {error && error === 404 ? (
                            <div className="w-full min-h-screen flex items-center justify-center">
                                <p className="text-lg font-medium text-gray-600">
                                    No user found{" "}
                                    <span className="text-blue-600 transition-all duration-1000 hover:underline">
                                        <a href="/">Create User</a>
                                    </span>
                                </p>
                            </div>
                        ) : error === 500 ? (
                            <div className="w-full min-h-screen flex items-center justify-center">
                                <p className="text-lg font-medium text-gray-600">
                                    Something went wrong{" "}
                                    <span className="text-blue-600 transition-all duration-1000 hover:underline">
                                        Try Again
                                    </span>
                                </p>
                            </div>
                        ) : null}

                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="w-full h-full grid grid-cols-3 gap-6 py-20"
                            >
                                <div className="w-full h-full shadow-lg rounded-md p-4">
                                    <img
                                        className="w-10 h-10 object-cover rounded-full mb-3"
                                        src={user.avatar}
                                        alt="profile"
                                    />
                                    <h4 className="text-2xl font-semibold">
                                        {user.fullName}
                                    </h4>
                                    <p className="text-lg font-normal text-gray-800 underline">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Users;
