import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const ROLE_CONFIG = {
  customer:    { label: 'Customer',    bg: '#dbeafe', color: '#1e40af', icon: 'person' },
  farmer:      { label: 'Farmer',      bg: '#d1fae5', color: '#065f46', icon: 'agriculture' },
  admin:       { label: 'Admin',       bg: '#fce7f3', color: '#9d174d', icon: 'shield_person' },
  field_agent: { label: 'Field Agent', bg: '#fef3c7', color: '#92400e', icon: 'support_agent' },
};

function RoleBadge({ role }) {
  const c = ROLE_CONFIG[role] || { label: role, bg: '#f3f4f6', color: '#374151', icon: 'person' };
  return (
    <span style={{ background: c.bg, color: c.color, padding: '3px 12px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>{c.icon}</span>
      {c.label}
    </span>
  );
}

function Avatar({ name, role }) {
  const c = ROLE_CONFIG[role] || ROLE_CONFIG.customer;
  return (
    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${c.color}20` }}>
      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: c.color }}>{c.icon}</span>
    </div>
  );
}

export default function AdminUsers() {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [toast, setToast] = useState({ msg: '', type: 'success' });
  const [actionLoading, setActionLoading] = useState('');
  const [editModal, setEditModal] = useState(null); // user object
  const [deleteConfirm, setDeleteConfirm] = useState(null); // user id
  const [editForm, setEditForm] = useState({ accountType: '', isApproved: true });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Filtered list
  const filtered = users.filter(u => {
    const matchRole = filterRole ? u.accountType === filterRole : true;
    const matchSearch = search
      ? u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchRole && matchSearch;
  });

  const openEdit = (user) => {
    setEditForm({ accountType: user.accountType, isApproved: user.isApproved });
    setEditModal(user);
  };

  const handleUpdate = async () => {
    setActionLoading('update');
    try {
      const res = await fetch(`${API_BASE}/auth/admin/users/${editModal._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('User updated successfully');
        setEditModal(null);
        fetchUsers();
      } else {
        showToast(data.message || 'Update failed', 'error');
      }
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const handleDelete = async () => {
    setActionLoading('delete');
    try {
      const res = await fetch(`${API_BASE}/auth/admin/users/${deleteConfirm}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        showToast('User deleted');
        setDeleteConfirm(null);
        fetchUsers();
      } else {
        showToast(data.message || 'Delete failed', 'error');
      }
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const quickToggleApproval = async (user) => {
    setActionLoading(user._id + 'approve');
    try {
      const res = await fetch(`${API_BASE}/auth/admin/users/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isApproved: !user.isApproved }),
      });
      if (res.ok) {
        showToast(`User ${!user.isApproved ? 'approved' : 'suspended'}`);
        fetchUsers();
      }
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  // Stats
  const stats = [
    { label: 'Total Users',   value: users.length,                                          icon: 'group',         color: '#3182ce' },
    { label: 'Customers',     value: users.filter(u => u.accountType === 'customer').length, icon: 'person',        color: '#1e5631' },
    { label: 'Farmers',       value: users.filter(u => u.accountType === 'farmer').length,   icon: 'agriculture',   color: '#10b981' },
    { label: 'Field Agents',  value: users.filter(u => u.accountType === 'field_agent').length, icon: 'support_agent', color: '#f59e0b' },
    { label: 'Pending Approval', value: users.filter(u => !u.isApproved).length,             icon: 'pending',       color: '#ef4444' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

      {/* Top Header */}
      <header style={{ background: '#0a1628', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/dashboard" style={{ color: '#9ca3af', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.88rem', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span> Dashboard
          </Link>
          <span style={{ color: '#374151' }}>|</span>
          <h1 style={{ color: '#fff', margin: 0, fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#a3e635', fontSize: '20px' }}>manage_accounts</span>
            User Management
          </h1>
        </div>
        <span style={{ background: '#dc2626', color: '#fff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>ADMIN</span>
      </header>

      {/* Toast */}
      {toast.msg && (
        <div style={{ position: 'fixed', top: '72px', right: '24px', background: toast.type === 'error' ? '#dc2626' : '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px', animation: 'slideIn 0.3s ease' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}

      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '22px' }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{loading ? '…' : s.value}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: '#6b7280', fontWeight: 600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter Bar */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '8px 14px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#9ca3af' }}>search</span>
            <input
              placeholder="Search by name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.88rem', color: '#111827', width: '100%' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            )}
          </div>

          {/* Role filter pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[{ label: 'All Roles', value: '' }, ...Object.entries(ROLE_CONFIG).map(([k, v]) => ({ label: v.label, value: k }))].map(opt => (
              <button key={opt.value} onClick={() => setFilterRole(opt.value)}
                style={{ padding: '6px 14px', borderRadius: '999px', border: filterRole === opt.value ? '2px solid #0a1628' : '2px solid #e5e7eb', background: filterRole === opt.value ? '#0a1628' : '#fff', color: filterRole === opt.value ? '#fff' : '#374151', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {opt.label}
              </button>
            ))}
          </div>

          <p style={{ margin: 0, marginLeft: 'auto', fontSize: '0.82rem', color: '#6b7280', whiteSpace: 'nowrap' }}>
            {filtered.length} of {users.length} users
          </p>
        </div>

        {/* Users Table */}
        <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.2fr', gap: '1rem', padding: '0.75rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            {['User', 'Email', 'Role', 'Status', 'Actions'].map(h => (
              <p key={h} style={{ margin: 0, fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</p>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>progress_activity</span>
              <p>Loading users…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '1rem' }}>person_search</span>
              <p style={{ fontWeight: 600 }}>No users found</p>
            </div>
          ) : (
            <div>
              {filtered.map((user, i) => (
                <div key={user._id}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.2fr', gap: '1rem', padding: '1rem 1.5rem', borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar name={user.name} role={user.accountType} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>{user.name}</p>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>
                        Joined {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </p>

                  {/* Role */}
                  <RoleBadge role={user.accountType} />

                  {/* Status */}
                  <div>
                    {user.isApproved ? (
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>check_circle</span> Active
                      </span>
                    ) : (
                      <span style={{ background: '#fee2e2', color: '#991b1b', padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>block</span> Suspended
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {/* Approve/Suspend toggle */}
                    <button
                      onClick={() => quickToggleApproval(user)}
                      disabled={!!actionLoading}
                      title={user.isApproved ? 'Suspend user' : 'Approve user'}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: user.isApproved ? '#fee2e2' : '#d1fae5', color: user.isApproved ? '#dc2626' : '#16a34a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', opacity: actionLoading ? 0.6 : 1 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        {actionLoading === user._id + 'approve' ? 'progress_activity' : (user.isApproved ? 'block' : 'check_circle')}
                      </span>
                    </button>

                    {/* Edit role */}
                    <button
                      onClick={() => openEdit(user)}
                      title="Edit user"
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#eff6ff', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirm(user._id)}
                      title="Delete user"
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Edit Modal ── */}
      {editModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setEditModal(null); }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>Edit User</h2>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* User info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', padding: '14px', background: '#f9fafb', borderRadius: '12px' }}>
              <Avatar name={editModal.name} role={editModal.accountType} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#111827' }}>{editModal.name}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>{editModal.email}</p>
              </div>
            </div>

            {/* Role select */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Role</label>
              <select
                value={editForm.accountType}
                onChange={e => setEditForm(f => ({ ...f, accountType: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '0.88rem', color: '#111827', background: '#fff', outline: 'none', cursor: 'pointer' }}>
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
                <option value="field_agent">Field Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Approval toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <div
                  onClick={() => setEditForm(f => ({ ...f, isApproved: !f.isApproved }))}
                  style={{ width: '44px', height: '24px', borderRadius: '999px', background: editForm.isApproved ? '#16a34a' : '#d1d5db', position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '3px', left: editForm.isApproved ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>
                  Account {editForm.isApproved ? 'Active (Approved)' : 'Suspended'}
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setEditModal(null)}
                style={{ flex: 1, padding: '11px', border: '2px solid #e5e7eb', borderRadius: '12px', background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                Cancel
              </button>
              <button onClick={handleUpdate} disabled={actionLoading === 'update'}
                style={{ flex: 2, padding: '11px', border: 'none', borderRadius: '12px', background: '#0a1628', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', opacity: actionLoading === 'update' ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                {actionLoading === 'update' ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <span className="material-symbols-outlined" style={{ color: '#dc2626', fontSize: '28px' }}>delete_forever</span>
            </div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>Delete User?</h2>
            <p style={{ margin: '0 0 1.5rem', color: '#6b7280', fontSize: '0.88rem' }}>
              This action is permanent and cannot be undone. The user will lose all access.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)}
                style={{ flex: 1, padding: '11px', border: '2px solid #e5e7eb', borderRadius: '12px', background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={actionLoading === 'delete'}
                style={{ flex: 1, padding: '11px', border: 'none', borderRadius: '12px', background: '#dc2626', color: '#fff', fontWeight: 700, cursor: 'pointer', opacity: actionLoading === 'delete' ? 0.7 : 1 }}>
                {actionLoading === 'delete' ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
