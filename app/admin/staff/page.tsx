"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Shield, Loader2, Search } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { PageHeader } from '../../../components/admin/PageHeader';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdminStaff() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error deleting user');
      console.error('Error deleting user', err);
    } finally {
      setIsDeleting(null);
    }
  };

  if (!hasRole('super-admin')) {
    return <div className="p-10 text-center text-destructive font-semibold">Access Denied. Super Admins only.</div>;
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Staff Management" 
        description="Manage admin access, editors, and platform permissions."
        action={
          <Button className="gap-2" asChild>
            <Link href="/admin/staff/new">
              <Plus className="w-4 h-4" /> Add Staff
            </Link>
          </Button>
        }
      />

      <div className="max-w-sm mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search staff..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.roles?.map((role: any) => (
                        <span key={role.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                          {role.name === 'super-admin' && <Shield className="w-3 h-3 text-brand-magenta" />}
                          {role.name}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/staff/${user.id}/edit`}>
                            <Edit2 className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting === user.id}
                          className="hover:text-destructive hover:bg-destructive/10"
                        >
                          {isDeleting === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
