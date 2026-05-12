function showPanel(name, el) {
  document.querySelectorAll('.app-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  el.classList.add('active');
}

function filterTable(tbodyId, query) {
  const q = query.toLowerCase();
  document.querySelectorAll('#' + tbodyId + ' tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

let modalType = 'book';

function openModal(type) {
  modalType = type;
  document.getElementById('modal-title').textContent = type === 'book' ? 'Add New Book' : 'Register Member';
  document.getElementById('modal-form-book').style.display = type === 'book' ? '' : 'none';
  document.getElementById('modal-form-member').style.display = type === 'member' ? '' : 'none';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function saveModal() {
  closeModal();
  const msg = modalType === 'book'
    ? '✅ Book added — COMMIT executed'
    : '✅ Member registered — COMMIT executed';
  showToast(msg);
  if (modalType === 'book') {
    document.getElementById('s-books').textContent =
      parseInt(document.getElementById('s-books').textContent) + 1;
  } else {
    document.getElementById('s-members').textContent =
      parseInt(document.getElementById('s-members').textContent) + 1;
  }
}

function borrowBook(btn) {
  const row = btn.closest('tr');
  const pill = row.querySelector('.pill');
  pill.className = 'pill pill-borrowed';
  pill.textContent = 'Borrowed';
  btn.textContent = 'Return';
  btn.onclick = function () { returnBook(this); };
  const b = parseInt(document.getElementById('s-borrowed').textContent);
  document.getElementById('s-borrowed').textContent = b + 1;
  showToast('📖 Book borrowed — transaction logged');
}

function returnBook(btn) {
  const row = btn.closest('tr');
  const pill = row.querySelector('.pill');
  pill.className = 'pill pill-available';
  pill.textContent = 'Available';
  btn.textContent = 'Borrow';
  btn.onclick = function () { borrowBook(this); };
  const b = parseInt(document.getElementById('s-borrowed').textContent);
  document.getElementById('s-borrowed').textContent = Math.max(0, b - 1);
  showToast('✅ Book returned — COMMIT executed');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});