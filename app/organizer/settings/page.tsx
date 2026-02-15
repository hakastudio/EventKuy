export default function Settings() {
  return (
    <div className="max-w-2xl">
       <h1 className="text-3xl font-black text-gray-900 mb-8">Pengaturan Akun</h1>
       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h3 className="font-bold text-gray-900">Profil Organizer</h3>
             <p className="text-sm text-gray-500">Atur info yang tampil di halaman event.</p>
          </div>
          <div className="p-6 space-y-4">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Penyelenggara</label>
                <input type="text" defaultValue="EventKuy Official" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Kontak</label>
                <input type="email" defaultValue="admin@eventkuy.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
             </div>
             <button className="px-6 py-2 bg-brand-blue text-white font-bold rounded-lg text-sm">Simpan Perubahan</button>
          </div>
       </div>
    </div>
  );
}