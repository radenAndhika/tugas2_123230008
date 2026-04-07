const notesList = document.getElementById("notes-list");
const noteForm = document.getElementById("note-form");
const noteIdInput = document.getElementById("note-id");
const judulInput = document.getElementById("judul");
const isiInput = document.getElementById("isi");
const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const statusMessage = document.getElementById("status-message");

const apiUrl = "/api/v1/notes";

const formatDate = (value) => {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const setStatus = (message, isError = false) => {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#b83c3c" : "#8f4b28";
};

const resetFormState = () => {
  noteForm.reset();
  noteIdInput.value = "";
  formTitle.textContent = "Tambah Catatan";
  formSubtitle.textContent = "Isi form untuk membuat catatan baru.";
  submitButton.textContent = "Simpan Catatan";
  cancelButton.classList.add("hidden");
};

const startEdit = (note) => {
  noteIdInput.value = note.id;
  judulInput.value = note.judul;
  isiInput.value = note.isi;
  formTitle.textContent = "Edit Catatan";
  formSubtitle.textContent = "Perbarui judul dan isi catatan yang dipilih.";
  submitButton.textContent = "Update Catatan";
  cancelButton.classList.remove("hidden");
  setStatus(`Sedang mengedit catatan ID ${note.id}.`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const createNoteCard = (note) => {
  const card = document.createElement("article");
  card.className = "note-card";

  const title = document.createElement("h3");
  title.textContent = note.judul;

  const meta = document.createElement("div");
  meta.className = "note-meta";
  meta.textContent = `Dibuat: ${formatDate(note.tanggal_dibuat)}`;

  const content = document.createElement("p");
  content.textContent = note.isi;

  const actions = document.createElement("div");
  actions.className = "note-actions";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "secondary";
  editButton.addEventListener("click", () => startEdit(note));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.className = "danger";
  deleteButton.addEventListener("click", async () => {
    const confirmed = window.confirm(`Hapus catatan "${note.judul}"?`);

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${note.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus catatan.");
      }

      if (Number(noteIdInput.value) === note.id) {
        resetFormState();
      }

      setStatus("Catatan berhasil dihapus.");
      await loadNotes();
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  actions.append(editButton, deleteButton);
  card.append(title, meta, content, actions);

  return card;
};

const renderNotes = (notes) => {
  notesList.innerHTML = "";

  if (!notes.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Belum ada catatan. Tambahkan catatan pertamamu.";
    notesList.appendChild(emptyState);
    return;
  }

  notes.forEach((note) => {
    notesList.appendChild(createNoteCard(note));
  });
};

const loadNotes = async () => {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal memuat catatan.");
    }

    renderNotes(result.data);
  } catch (error) {
    setStatus(error.message, true);
  }
};

noteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    judul: judulInput.value.trim(),
    isi: isiInput.value.trim(),
  };

  const isEditing = Boolean(noteIdInput.value);
  const url = isEditing ? `${apiUrl}/${noteIdInput.value}` : apiUrl;
  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal menyimpan catatan.");
    }

    setStatus(
      isEditing ? "Catatan berhasil diperbarui." : "Catatan berhasil ditambahkan."
    );
    resetFormState();
    await loadNotes();
  } catch (error) {
    setStatus(error.message, true);
  }
});

cancelButton.addEventListener("click", () => {
  resetFormState();
  setStatus("Mode edit dibatalkan.");
});

resetFormState();
loadNotes();
