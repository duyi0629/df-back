import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React, { memo, useEffect, useState } from "react";
import { getUserList } from "@/service/modules/user";

interface UserPorps {
    _id: string,
    name: string,
    createdAt: string,

}

const UserList = memo(() => {
    const [userList, setUserList] = useState<UserPorps[]>([])
    useEffect(() => {
        const getUserListData = async () => {
            const res = await getUserList()
            if(res.code === 200) {
                setUserList(res.data)
            }
        }
        getUserListData();
    }, [])
  return (
    <div className="py-6 px-8">
      <button >添加</button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>用户名</TableCell>
            <TableCell>创建时间</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
            {
                userList.map(user => {
                    return (
                    <TableRow key={user._id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                            </TableRow>

                    )
                })
            }
        </TableBody>
      </Table>
    </div>
  );
});

export default UserList;
