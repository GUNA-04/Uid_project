document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('patients')) {
    const patients = [
      { id:'PR001', name:'John Doe', dob:'1980-01-15', lastVisit:'2025-03-15', diagnosis:'Flu', prescriptions:'Paracetamol' },
      { id:'PR002', name:'Jane Smith', dob:'1990-05-20', lastVisit:'2025-03-10', diagnosis:'Diabetes', prescriptions:'Insulin' }
    ];
    localStorage.setItem('patients', JSON.stringify(patients));
  }

  if (!localStorage.getItem('doctors')) {
    const doctors = [
      {name:'Dr. Smith', specialty:'Cardiologist'},
      {name:'Dr. Johnson', specialty:'Neurologist'},
      {name:'Dr. Brown', specialty:'General Physician'},
      {name:'Dr. Davis', specialty:'Dermatologist'}
    ];
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }

  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify([]));
  }

  const modal = document.getElementById('status-modal');
  const msgEl = document.getElementById('modal-message');
  if (modal && msgEl) {
    document.getElementById('modal-close').onclick = () => modal.classList.add('hidden');
  }
  function showModal(text) {
    if (modal && msgEl) {
      msgEl.textContent = text;
      modal.classList.remove('hidden');
    } else {
      alert(text);
    }
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const u = e.target.querySelector('#username').value.trim();
      const p = e.target.querySelector('#password').value;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const valid = users.some(uobj => uobj.username === u && uobj.password === p);
      if (valid || (u === 'admin' && p === 'password123')) {
        showModal('✅ Login successful — welcome!');
        e.target.reset();
      } else {
        showModal('❌ Invalid username or password.');
      }
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const u = e.target.querySelector('#new-username').value.trim();
      const p = e.target.querySelector('#new-password').value;
      if (!u || !p) {
        return showModal('⚠️ Please fill in both fields.');
      }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(uobj => uobj.username === u)) {
        showModal('⚠️ Username already taken.');
      } else {
        users.push({ username: u, password: p });
        localStorage.setItem('users', JSON.stringify(users));
        showModal('🎉 Registration successful! You can now log in.');
        e.target.reset();
      }
    });
  }

  const doctorsContainer = document.getElementById('doctors-container');
  if (doctorsContainer) {
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    if (doctors.length === 0) {
      doctorsContainer.innerHTML = '<li>No doctors available.</li>';
    } else {
      doctors.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = `${doc.name} — ${doc.specialty}`;
        doctorsContainer.appendChild(li);
      });
    }
  }

  const doctorForm = document.getElementById('doctor-manage-form');
  const doctorsTableBody = document.querySelector('#doctors-table tbody');
  if (doctorForm && doctorsTableBody) {
    doctorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const doctorName = document.getElementById('doctor-name').value.trim();
      const specialty = document.getElementById('specialty').value.trim();
      if (doctorName && specialty) {
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = doctorName;
        const specialtyCell = document.createElement('td');
        specialtyCell.textContent = specialty;
        newRow.appendChild(nameCell);
        newRow.appendChild(specialtyCell);
        doctorsTableBody.appendChild(newRow);
        doctorForm.reset();
      } else {
        alert("Please enter both doctor name and specialty.");
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const addPatientForm = document.getElementById('add-patient-form');
  const patientTableBody = document.querySelector('#patient-records-table tbody');

  if (addPatientForm && patientTableBody) {
    addPatientForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = document.getElementById('new-id').value.trim();
      const name = document.getElementById('new-name').value.trim();
      const dob = document.getElementById('new-dob').value;
      const lastVisit = document.getElementById('new-lastvisit').value;
      const diagnosis = document.getElementById('new-diagnosis').value.trim();
      const prescriptions = document.getElementById('new-prescriptions').value.trim();

      if (id && name && dob && lastVisit && diagnosis && prescriptions) {
        const newPatient = { id, name, dob, lastVisit, diagnosis, prescriptions };
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${id}</td>
          <td>${name}</td>
          <td>${lastVisit}</td>
          <td>${diagnosis}</td>
          <td>${prescriptions}</td>
        `;
        patientTableBody.appendChild(newRow);

        addPatientForm.reset();
        alert("✅ Patient added successfully!");
      } else {
        alert("⚠️ Please fill in all fields.");
      }
    });
  }
});
