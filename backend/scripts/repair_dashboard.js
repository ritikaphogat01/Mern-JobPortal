const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../screens/AdminDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

const insertionPoint = '{showTxModal &&';

if (!content.includes('showCompanyModal &&')) {
    const modals = `
      {/* ── COMPANY & CANDIDATE MODALS ── */}
      {showCompanyModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-accent/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-black mb-6">{editingCompany ? 'Edit Company' : 'Add Company'}</h3>
            <div className="space-y-4">
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" placeholder="Company Name" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} />
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" placeholder="Industry" value={companyForm.industry} onChange={e => setCompanyForm({...companyForm, industry: e.target.value})} />
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs" onClick={() => setShowCompanyModal(false)}>Cancel</button>
                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs" onClick={handleCompanySave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteCompanyConfirmId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-accent/70 backdrop-blur-md">
          <div className="bg-white p-12 rounded-[3.5rem] text-center shadow-2xl">
            <h3 className="text-2xl font-black mb-4">Delete Company?</h3>
            <p className="text-gray-500 mb-8">This action is permanent.</p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-gray-100 rounded-2xl font-bold" onClick={() => setDeleteCompanyConfirmId(null)}>Cancel</button>
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold" onClick={() => handleCompanyDelete(deleteCompanyConfirmId)}>Delete Now</button>
            </div>
          </div>
        </div>
      )}
      {showCandidateModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-accent/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl">
            <h3 className="text-2xl font-black mb-6">{editingCandidate ? 'Edit Candidate' : 'Add Candidate'}</h3>
            <div className="space-y-4">
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" placeholder="Candidate Name" value={candidateForm.name} onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} />
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs" onClick={() => setShowCandidateModal(false)}>Cancel</button>
                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs" onClick={handleCandidateSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteCandidateConfirmId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-accent/70 backdrop-blur-md">
          <div className="bg-white p-12 rounded-[3.5rem] text-center shadow-2xl">
            <h3 className="text-2xl font-black mb-4">Delete Candidate?</h3>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-gray-100 rounded-2xl font-bold" onClick={() => setDeleteCandidateConfirmId(null)}>Cancel</button>
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold" onClick={() => handleCandidateDelete(deleteCandidateConfirmId)}>Delete Now</button>
            </div>
          </div>
        </div>
      )}
`;
    content = content.replace(insertionPoint, modals + insertionPoint);
    fs.writeFileSync(file, content);
    console.log('AdminDashboard.tsx Modals successfully updated.');
} else {
    console.log('Modals already exist.');
}
