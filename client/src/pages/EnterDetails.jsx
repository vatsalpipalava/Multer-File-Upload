import axios from "axios";
import { useState } from "react";

function EnterDetails() {
    const [avatar, setAvatar] = useState({ file: null, preview: null });
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar({
            file: file,
            preview: URL.createObjectURL(file),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("email", email);
        // formData.append("fullName", fullName);
        // formData.append("avatar", avatar.file);
        // console.log(avatar.file);
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/v1/auth/avatar-upload`,
                {email, fullName, avatar: avatar.file},
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (response) {
                alert(response.data.message);
            }
            setAvatar("");
            setEmail("");
            setFullName("");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                    User Profile
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                            htmlFor="user_avatar"
                        >
                            Profile Picture
                        </label>
                        <div className="flex items-center">
                            <label
                                htmlFor="image-upload"
                                className="relative cursor-pointer"
                            >
                                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600">
                                    {avatar.preview ? (
                                        <img
                                            src={avatar.preview}
                                            alt="Selected"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center h-full">
                                            <span className="text-gray-400 dark:text-gray-600">
                                                +
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    // onChange={(e) =>
                                    //     setAvatar(e.target.files[0])
                                    // }
                                    onChange={handleAvatarChange}
                                />
                                <div className="absolute right-0 bottom-0 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-full h-7 w-7 flex justify-center items-center cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-600 dark:text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.707 5.293a1 1 0 010 1.414L6.414 16.707a1 1 0 01-1.414-1.414l9.293-9.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </label>
                        </div>
                        <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                        >
                            A profile picture is useful to confirm you are
                            logged into your account
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="fullName"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="John Doe"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="john.doe@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EnterDetails;
