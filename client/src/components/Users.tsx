import React, { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

const mockUsers: User[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "Analyst", status: "Active" },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUsers(mockUsers);
        }, 500);
    }, []);

    return (
        <div className="container mx-auto mt-8 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                            <td className="py-2 px-4 border-b">{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Users;