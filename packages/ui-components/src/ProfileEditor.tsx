import React, { useState } from 'react';

export type Profile = {
  id?: string;
  name: string;
  role?: 'parent' | 'child' | 'user';
  note?: string;
};

type Props = {
  initial?: Profile;
  onSave?: (p: Profile) => void | Promise<void>;
};

export default function ProfileEditor({ initial, onSave }: Props) {
  const [name, setName] = useState(initial?.name || '');
  const [role, setRole] = useState<Profile['role']>(initial?.role || 'user');
  const [note, setNote] = useState(initial?.note || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const profile: Profile = { id: initial?.id, name, role, note };
    try {
      await Promise.resolve(onSave ? onSave(profile) : undefined);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{maxWidth:480}}>
      <div style={{marginBottom:8}}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} style={{width:'100%', padding:8}} />
      </div>
      <div style={{marginBottom:8}}>
        <label>Role</label>
        <select value={role} onChange={e => setRole(e.target.value as any)} style={{width:'100%', padding:8}}>
          <option value="user">User</option>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
        </select>
      </div>
      <div style={{marginBottom:8}}>
        <label>Note</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} style={{width:'100%', padding:8}} />
      </div>
      <div>
        <button onClick={save} disabled={saving} className="ohino-btn ohino-btn--primary">{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );
}
