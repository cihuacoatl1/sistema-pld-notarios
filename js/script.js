// Datos de ejemplo para simulación
const users = [
    { id: 1, username: "notario", password: "password", name: "Juan Pérez", notaryId: "12345" },
    { id: 2, username: "admin", password: "admin123", name: "María García", notaryId: "67890" }
];

let clients = [
    { 
        id: 1, 
        type: "fisica",
        nombre: "Carlos", 
        apellidoPaterno: "Rodríguez", 
        apellidoMaterno: "López",
        nombreCompleto: "Carlos Rodríguez López",
        rfc: "CARR800101ABC", 
        curp: "CARR800101HDFLPC09",
        fechaNacimiento: "1980-01-01",
        nacionalidad: "Mexicana",
        ocupacion: "Ingeniero",
        telefono: "5551234567",
        email: "carlos.rodriguez@email.com",
        domicilio: "Av. Insurgentes 123, CDMX",
        ppe: false,
        documentos: [
            { id: 1, nombre: "INE_frontal.jpg", tipo: "Identificación", fecha: "2023-05-10" },
            { id: 2, nombre: "INE_reverso.jpg", tipo: "Identificación", fecha: "2023-05-10" },
            { id: 3, nombre: "Constancia_Situacion_Fiscal.pdf", tipo: "Constancia Fiscal", fecha: "2023-06-15" }
        ]
    },
    { 
        id: 2, 
        type: "fisica",
        nombre: "Ana", 
        apellidoPaterno: "Martínez", 
        apellidoMaterno: "García",
        nombreCompleto: "Ana Martínez García",
        rfc: "MAAA750505XYZ", 
        curp: "MAAA750505MDFRRN01",
        fechaNacimiento: "1975-05-05",
        nacionalidad: "Mexicana",
        ocupacion: "Arquitecta",
        telefono: "5559876543",
        email: "ana.martinez@email.com",
        domicilio: "Calle Reforma 456, CDMX",
        ppe: false,
        documentos: [
            { id: 1, nombre: "INE.pdf", tipo: "Identificación", fecha: "2023-07-20" },
            { id: 2, nombre: "CSF.pdf", tipo: "Constancia Fiscal", fecha: "2023-07-20" }
        ]
    },
    { 
        id: 3, 
        type: "moral",
        razonSocial: "Inmobiliaria Sol", 
        rfc: "ISO900101XYZ",
        fechaConstitucion: "2005-03-15",
        objetoSocial: "Desarrollo y venta de bienes inmuebles",
        domicilio: "Blvd. Miguel de Cervantes 789, CDMX",
        nombreRepresentante: "Roberto Sánchez Jiménez",
        rfcRepresentante: "SARR651215ABC",
        telefono: "5554567890",
        email: "contacto@inmobiliariasol.com",
        ppe: false,
        beneficiarios: [
            {
                id: 1,
                nombre: "Roberto",
                apellidoPaterno: "Sánchez",
                apellidoMaterno: "Jiménez",
                rfc: "SARR651215ABC",
                curp: "SARR651215HDFMJB01",
                nacionalidad: "Mexicana",
                participacion: 45.5,
                domicilio: "Av. Constituyentes 1011, CDMX"
            },
            {
                id: 2,
                nombre: "María",
                apellidoPaterno: "Gómez",
                apellidoMaterno: "López",
                rfc: "GOLM700505XYZ",
                curp: "GOLM700505MDFLPR02",
                nacionalidad: "Mexicana",
                participacion: 30.25,
                domicilio: "Calle Morelos 222, CDMX"
            }
        ],
        documentos: [
            { id: 1, nombre: "Acta_Constitutiva.pdf", tipo: "Acta Constitutiva", fecha: "2005-03-15" },
            { id: 2, nombre: "Poder_Notarial.pdf", tipo: "Poder Notarial", fecha: "2022-11-30" },
            { id: 3, nombre: "Constancia_Situacion_Fiscal.pdf", tipo: "Constancia Fiscal", fecha: "2023-08-01" }
        ]
    },
    { 
        id: 4, 
        type: "fisica",
        nombre: "Roberto", 
        apellidoPaterno: "Sánchez", 
        apellidoMaterno: "Jiménez",
        nombreCompleto: "Roberto Sánchez Jiménez",
        rfc: "SARR651215ABC", 
        curp: "SARR651215HDFMJB01",
        fechaNacimiento: "1965-12-15",
        nacionalidad: "Mexicana",
        ocupacion: "Diputado Federal",
        telefono: "5557890123",
        email: "roberto.sanchez@email.com",
        domicilio: "Av. Constituyentes 1011, CDMX",
        ppe: true,
        cargoPublico: "Diputado Federal",
        periodo: "2021-2024",
        documentos: [
            { id: 1, nombre: "INE_Roberto.pdf", tipo: "Identificación", fecha: "2023-04-18" },
            { id: 2, nombre: "CSF_Roberto.pdf", tipo: "Constancia Fiscal", fecha: "2023-04-18" }
        ]
    }
];

let operations = [
    { id: 1, date: "2025-08-15", type: "compraventa", amount: 1250000, clientId: 1, description: "Compraventa de casa habitación", requiresNotice: true, ppe: false, submitted: false, numeroEscritura: "12345", partesInvolucradas: "Carlos Rodríguez López y María González Fernández" },
    { id: 2, date: "2025-08-18", type: "testamento", amount: 5000, clientId: 2, description: "Testamento público abierto", requiresNotice: false, ppe: false, submitted: true, numeroEscritura: "", partesInvolucradas: "Ana Martínez García" },
    { id: 3, date: "2025-08-20", type: "fideicomiso", amount: 650000, clientId: 3, description: "Constitución de fideicomiso de inversión", requiresNotice: true, ppe: false, submitted: false, numeroEscritura: "67890", partesInvolucradas: "Inmobiliaria Sol y Roberto Sánchez Jiménez" }
];

// Variables globales
let currentUser = null;
let umaValue = 120.36; // Valor de ejemplo de la UMA en MXN
let currentClientId = null;
let currentBeneficiaryId = null;
let editingClientId = null;

// Umbrales según SAT (https://sppld.sat.gob.mx/pld/interiores/umbrales.html)
const umbrales = {
    compraventa: {
        identificacion: 1605, // UMA
        aviso: 8025 // UMA
    },
    fideicomiso: {
        aviso: 4000 // UMA
    },
    avaluo: {
        aviso: 8025 // UMA
    },
    tarjetaServicios: {
        identificacion: 805, // UMA
        aviso: 1285 // UMA
    }
};

// Elementos DOM
const loginSystem = document.getElementById('login-system');
const mainSystem = document.getElementById('main-system');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const userDisplay = document.getElementById('user-display');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const clientModal = document.getElementById('client-modal');
const beneficiaryModal = document.getElementById('beneficiary-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const addClientBtn = document.getElementById('add-client-btn');
const saveClientBtn = document.getElementById('save-client-btn');
const addBeneficiaryBtn = document.getElementById('add-beneficiary-btn');
const saveBeneficiaryBtn = document.getElementById('save-beneficiary-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    loginBtn.addEventListener('click', login);
    logoutBtn.addEventListener('click', logout);
    
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Actualizar clase active
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Formulario de operación
    document.getElementById('operacion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addOperation();
    });
    
    // Checkbox PPE
    document.getElementById('ppp-check').addEventListener('change', function() {
        document.getElementById('ppp-details').classList.toggle('hidden', !this.checked);
    });
    
    // Botones de configuración
    document.getElementById('save-config-btn').addEventListener('click', saveConfig);
    
    // Modal de cliente
    addClientBtn.addEventListener('click', () => {
        editingClientId = null;
        document.getElementById('modal-client-title').textContent = 'Agregar Nuevo Cliente';
        resetClientForm();
        clientModal.classList.add('active');
    });
    
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            clientModal.classList.remove('active');
            beneficiaryModal.classList.remove('active');
        });
    });
    
    // Tabs del modal
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            document.getElementById('client-type').value = tabId === 'persona-fisica' ? 'fisica' : 'moral';
        });
    });
    
    // Guardar cliente
    saveClientBtn.addEventListener('click', saveClient);
    
    // Beneficiario controlador
    addBeneficiaryBtn.addEventListener('click', () => {
        currentBeneficiaryId = null;
        resetBeneficiaryForm();
        beneficiaryModal.classList.add('active');
    });
    
    saveBeneficiaryBtn.addEventListener('click', saveBeneficiary);
    
    // Detectar cambios en tipo de acto y monto
    document.getElementById('tipo-acto').addEventListener('change', checkUmbrales);
    document.getElementById('monto').addEventListener('input', checkUmbrales);
    
    // Cargar datos iniciales
    loadClientSelect();
    loadOperationsList();
    loadClientsList();
    updateDashboard();
});

// Función para verificar umbrales
function checkUmbrales() {
    const tipoActo = document.getElementById('tipo-acto').value;
    const monto = parseFloat(document.getElementById('monto').value) || 0;
    const umaAmount = monto / umaValue;
    const alertContainer = document.getElementById('umbral-alert');
    
    alertContainer.innerHTML = '';
    
    if (!tipoActo) return;
    
    let alertMessage = '';
    let alertClass = '';
    
    switch(tipoActo) {
        case 'compraventa':
            if (umaAmount >= umbrales.compraventa.aviso) {
                alertMessage = `¡ALERTA: El monto supera el umbral de aviso (${umbrales.compraventa.aviso} UMA). Debe presentar aviso.`;
                alertClass = 'danger';
            } else if (umaAmount >= umbrales.compraventa.identificacion) {
                alertMessage = `El monto supera el umbral de identificación (${umbrales.compraventa.identificacion} UMA). Debe aplicar medidas de identificación reforzada.`;
                alertClass = 'warning';
            }
            break;
            
        case 'fideicomiso':
            if (umaAmount >= umbrales.fideicomiso.aviso) {
                alertMessage = `¡ALERTA: El monto supera el umbral de aviso (${umbrales.fideicomiso.aviso} UMA). Debe presentar aviso.`;
                alertClass = 'danger';
            }
            break;
            
        case 'avaluo':
            if (umaAmount >= umbrales.avaluo.aviso) {
                alertMessage = `¡ALERTA: El monto supera el umbral de aviso (${umbrales.avaluo.aviso} UMA). Debe presentar aviso.`;
                alertClass = 'danger';
            }
            break;
            
        case 'tarjeta-servicios':
            if (umaAmount >= umbrales.tarjetaServicios.aviso) {
                alertMessage = `¡ALERTA: El monto supera el umbral de aviso (${umbrales.tarjetaServicios.aviso} UMA). Debe presentar aviso.`;
                alertClass = 'danger';
            } else if (umaAmount >= umbrales.tarjetaServicios.identificacion) {
                alertMessage = `El monto supera el umbral de identificación (${umbrales.tarjetaServicios.identificacion} UMA). Debe aplicar medidas de identificación reforzada.`;
                alertClass = 'warning';
            }
            break;
    }
    
    if (alertMessage) {
        alertContainer.innerHTML = `
            <div class="threshold-alert ${alertClass}">
                <i class="fas fa-exclamation-triangle"></i>
                ${alertMessage}
            </div>
        `;
    }
}

// Funciones de autenticación
function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        loginSystem.classList.add('hidden');
        mainSystem.classList.remove('hidden');
        userDisplay.textContent = `Notario: ${user.name} (ID: ${user.notaryId})`;
        loginError.classList.add('hidden');
    } else {
        loginError.classList.remove('hidden');
    }
}

function logout() {
    currentUser = null;
    mainSystem.classList.add('hidden');
    loginSystem.classList.remove('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
}

// Navegación
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Operaciones
function addOperation() {
    const date = document.getElementById('fecha-operacion').value;
    const type = document.getElementById('tipo-acto').value;
    const amount = parseFloat(document.getElementById('monto').value);
    const clientId = parseInt(document.getElementById('cliente').value);
    const description = document.getElementById('descripcion').value;
    const isPpe = document.getElementById('ppp-check').checked;
    const ppeCargo = document.getElementById('ppp-cargo').value;
    const ppePeriodo = document.getElementById('ppp-periodo').value;
    const numeroEscritura = document.getElementById('numero-escritura').value;
    const partesInvolucradas = document.getElementById('partes-involucradas').value;
    
    // Determinar si requiere aviso según los umbrales
    let requiresNotice = false;
    const umaAmount = amount / umaValue;
    
    if (type === 'compraventa' && umaAmount >= umbrales.compraventa.aviso) {
        requiresNotice = true;
    } else if (type === 'fideicomiso' && umaAmount >= umbrales.fideicomiso.aviso) {
        requiresNotice = true;
    } else if (type === 'avaluo' && umaAmount >= umbrales.avaluo.aviso) {
        requiresNotice = true;
    } else if (type === 'tarjeta-servicios' && umaAmount >= umbrales.tarjetaServicios.aviso) {
        requiresNotice = true;
    }
    
    const newOperation = {
        id: operations.length > 0 ? Math.max(...operations.map(op => op.id)) + 1 : 1,
        date: date,
        type: type,
        amount: amount,
        clientId: clientId,
        description: description,
        requiresNotice: requiresNotice,
        ppe: isPpe,
        submitted: false,
        numeroEscritura: numeroEscritura,
        partesInvolucradas: partesInvolucradas
    };
    
    operations.push(newOperation);
    
    // Si es PPE, actualizar el cliente
    if (isPpe) {
        const clientIndex = clients.findIndex(c => c.id === clientId);
        if (clientIndex !== -1) {
            clients[clientIndex].ppe = true;
            clients[clientIndex].cargoPublico = ppeCargo;
            clients[clientIndex].periodo = ppePeriodo;
        }
    }
    
    // Limpiar formulario
    document.getElementById('operacion-form').reset();
    document.getElementById('ppp-details').classList.add('hidden');
    document.getElementById('umbral-alert').innerHTML = '';
    
    // Actualizar listas y dashboard
    loadClientSelect();
    loadOperationsList();
    loadClientsList();
    updateDashboard();
    
    // Mostrar mensaje de éxito
    alert('Operación registrada correctamente' + (requiresNotice ? '. ¡Requiere presentar aviso!' : '.'));
}

function loadOperationsList() {
    const operationsList = document.getElementById('operations-list');
    operationsList.innerHTML = '';
    
    operations.forEach(op => {
        const client = clients.find(c => c.id === op.clientId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(op.date)}</td>
            <td>${client ? client.nombreCompleto || client.razonSocial : 'Cliente no encontrado'}</td>
            <td>${getActTypeText(op.type)}</td>
            <td>$${op.amount.toLocaleString('es-MX')}</td>
            <td>${op.requiresNotice ? '<span style="color: red;">SÍ</span>' : 'No'}</td>
            <td>${op.ppe ? 'SÍ' : 'No'}</td>
            <td class="actions">
                <button class="btn-success action-btn" onclick="submitNotice(${op.id})">
                    <i class="fas fa-paper-plane"></i>
                </button>
                <button class="action-btn" onclick="editOperation(${op.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-danger action-btn" onclick="deleteOperation(${op.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        operationsList.appendChild(row);
    });
}

function submitNotice(operationId) {
    const operation = operations.find(op => op.id === operationId);
    if (operation) {
        operation.submitted = true;
        loadOperationsList();
        updateDashboard();
        alert('Aviso presentado correctamente.');
    }
}

function editOperation(operationId) {
    // Implementar funcionalidad de edición
    alert('Funcionalidad de edición en desarrollo.');
}

function deleteOperation(operationId) {
    if (confirm('¿Está seguro de eliminar esta operación?')) {
        operations = operations.filter(op => op.id !== operationId);
        loadOperationsList();
        updateDashboard();
    }
}

// Clientes
function saveClient() {
    const clientType = document.getElementById('client-type').value;
    
    if (clientType === 'fisica') {
        // Validar campos requeridos
        if (!document.getElementById('nombre').value || 
            !document.getElementById('apellido-paterno').value ||
            !document.getElementById('rfc').value ||
            !document.getElementById('curp').value ||
            !document.getElementById('fecha-nacimiento').value ||
            !document.getElementById('nacionalidad').value ||
            !document.getElementById('ocupacion').value ||
            !document.getElementById('telefono').value ||
            !document.getElementById('email').value ||
            !document.getElementById('domicilio').value) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }
        
        const clientData = {
            type: "fisica",
            nombre: document.getElementById('nombre').value,
            apellidoPaterno: document.getElementById('apellido-paterno').value,
            apellidoMaterno: document.getElementById('apellido-materno').value,
            nombreCompleto: `${document.getElementById('nombre').value} ${document.getElementById('apellido-paterno').value} ${document.getElementById('apellido-materno').value}`,
            rfc: document.getElementById('rfc').value,
            curp: document.getElementById('curp').value,
            fechaNacimiento: document.getElementById('fecha-nacimiento').value,
            nacionalidad: document.getElementById('nacionalidad').value,
            ocupacion: document.getElementById('ocupacion').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            domicilio: document.getElementById('domicilio').value,
            ppe: document.getElementById('ppp-check-modal').checked,
            cargoPublico: document.getElementById('ppp-check-modal').checked ? document.getElementById('ppp-cargo').value : '',
            periodo: document.getElementById('ppp-check-modal').checked ? document.getElementById('ppp-periodo').value : '',
            documentos: editingClientId ? clients.find(c => c.id === editingClientId).documentos : []
        };
        
        if (editingClientId) {
            // Actualizar cliente existente
            const index = clients.findIndex(c => c.id === editingClientId);
            clients[index] = { ...clients[index], ...clientData };
        } else {
            // Crear nuevo cliente
            const newClient = {
                id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
                ...clientData
            };
            clients.push(newClient);
        }
    } else {
        // Validar campos requeridos
        if (!document.getElementById('razon-social').value || 
            !document.getElementById('rfc-moral').value ||
            !document.getElementById('fecha-constitucion').value ||
            !document.getElementById('objeto-social').value ||
            !document.getElementById('domicilio-moral').value ||
            !document.getElementById('nombre-representante').value ||
            !document.getElementById('rfc-representante').value ||
            !document.getElementById('telefono-moral').value ||
            !document.getElementById('email-moral').value) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }
        
        const clientData = {
            type: "moral",
            razonSocial: document.getElementById('razon-social').value,
            rfc: document.getElementById('rfc-moral').value,
            fechaConstitucion: document.getElementById('fecha-constitucion').value,
            objetoSocial: document.getElementById('objeto-social').value,
            domicilio: document.getElementById('domicilio-moral').value,
            nombreRepresentante: document.getElementById('nombre-representante').value,
            rfcRepresentante: document.getElementById('rfc-representante').value,
            telefono: document.getElementById('telefono-moral').value,
            email: document.getElementById('email-moral').value,
            ppe: document.getElementById('ppp-check-moral').checked,
            beneficiarios: editingClientId ? clients.find(c => c.id === editingClientId).beneficiarios || [] : [],
            documentos: editingClientId ? clients.find(c => c.id === editingClientId).documentos : []
        };
        
        if (editingClientId) {
            // Actualizar cliente existente
            const index = clients.findIndex(c => c.id === editingClientId);
            clients[index] = { ...clients[index], ...clientData };
        } else {
            // Crear nuevo cliente
            const newClient = {
                id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
                ...clientData
            };
            clients.push(newClient);
        }
    }
    
    // Cerrar modal y limpiar formulario
    clientModal.classList.remove('active');
    
    // Actualizar listas
    loadClientSelect();
    loadClientsList();
    
    alert('Cliente ' + (editingClientId ? 'actualizado' : 'agregado') + ' correctamente.');
}

function resetClientForm() {
    document.getElementById('client-form').reset();
    document.getElementById('client-id').value = '';
    document.getElementById('client-type').value = 'fisica';
    
    // Mostrar pestaña de persona física por defecto
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    document.querySelector('[data-tab="persona-fisica"]').classList.add('active');
    document.getElementById('persona-fisica').classList.add('active');
    
    // Limpiar listas de documentos y beneficiarios
    document.getElementById('documentos-fisica').innerHTML = '';
    document.getElementById('documentos-moral').innerHTML = '';
    document.getElementById('beneficiarios-list').innerHTML = '';
}

function loadClientSelect() {
    const clientSelect = document.getElementById('cliente');
    clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.type === 'fisica' ? 
            `${client.nombreCompleto} (${client.rfc})` : 
            `${client.razonSocial} (${client.rfc})`;
        clientSelect.appendChild(option);
    });
}

function loadClientsList() {
    const clientsList = document.getElementById('clients-list');
    clientsList.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        
        if (client.type === 'fisica') {
            row.innerHTML = `
                <td>${client.nombreCompleto}</td>
                <td>${client.rfc}</td>
                <td>Persona Física</td>
                <td>${client.ppe ? 'SÍ' : 'No'}</td>
                <td class="actions">
                    <button class="action-btn" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger action-btn" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${client.razonSocial}</td>
                <td>${client.rfc}</td>
                <td>Persona Moral</td>
                <td>${client.ppe ? 'SÍ' : 'No'}</td>
                <td class="actions">
                    <button class="action-btn" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger action-btn" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
        }
        
        clientsList.appendChild(row);
    });
}

function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    editingClientId = clientId;
    document.getElementById('modal-client-title').textContent = 'Editar Cliente';
    
    // Seleccionar la pestaña correcta
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    
    if (client.type === 'fisica') {
        document.querySelector('[data-tab="persona-fisica"]').classList.add('active');
        document.getElementById('persona-fisica').classList.add('active');
        document.getElementById('client-type').value = 'fisica';
        
        // Llenar formulario de persona física
        document.getElementById('nombre').value = client.nombre;
        document.getElementById('apellido-paterno').value = client.apellidoPaterno;
        document.getElementById('apellido-materno').value = client.apellidoMaterno || '';
        document.getElementById('rfc').value = client.rfc;
        document.getElementById('curp').value = client.curp;
        document.getElementById('fecha-nacimiento').value = client.fechaNacimiento;
        document.getElementById('nacionalidad').value = client.nacionalidad;
        document.getElementById('ocupacion').value = client.ocupacion;
        document.getElementById('telefono').value = client.telefono;
        document.getElementById('email').value = client.email;
        document.getElementById('domicilio').value = client.domicilio;
        document.getElementById('ppp-check-modal').checked = client.ppe || false;
        
        // Cargar documentos
        loadDocumentosList(client.documentos, 'fisica');
    } else {
        document.querySelector('[data-tab="persona-moral"]').classList.add('active');
        document.getElementById('persona-moral').classList.add('active');
        document.getElementById('client-type').value = 'moral';
        
        // Llenar formulario de persona moral
        document.getElementById('razon-social').value = client.razonSocial;
        document.getElementById('rfc-moral').value = client.rfc;
        document.getElementById('fecha-constitucion').value = client.fechaConstitucion;
        document.getElementById('objeto-social').value = client.objetoSocial;
        document.getElementById('domicilio-moral').value = client.domicilio;
        document.getElementById('nombre-representante').value = client.nombreRepresentante;
        document.getElementById('rfc-representante').value = client.rfcRepresentante;
        document.getElementById('telefono-moral').value = client.telefono;
        document.getElementById('email-moral').value = client.email;
        document.getElementById('ppp-check-moral').checked = client.ppe || false;
        
        // Cargar beneficiarios
        loadBeneficiariosList(client.beneficiarios || []);
        
        // Cargar documentos
        loadDocumentosList(client.documentos, 'moral');
    }
    
    clientModal.classList.add('active');
}

function deleteClient(clientId) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        // Verificar si el cliente está en uso
        const clientInUse = operations.some(op => op.clientId === clientId);
        
        if (clientInUse) {
            alert('No se puede eliminar el cliente porque tiene operaciones asociadas.');
        } else {
            clients = clients.filter(c => c.id !== clientId);
            loadClientsList();
            loadClientSelect();
        }
    }
}

// Beneficiarios Controladores
function saveBeneficiary() {
    // Validar campos requeridos
    if (!document.getElementById('beneficiary-nombre').value || 
        !document.getElementById('beneficiary-apellido-paterno').value ||
        !document.getElementById('beneficiary-rfc').value ||
        !document.getElementById('beneficiary-curp').value ||
        !document.getElementById('beneficiary-nacionalidad').value ||
        !document.getElementById('beneficiary-participacion').value ||
        !document.getElementById('beneficiary-domicilio').value) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }
    
    const beneficiaryData = {
        nombre: document.getElementById('beneficiary-nombre').value,
        apellidoPaterno: document.getElementById('beneficiary-apellido-paterno').value,
        apellidoMaterno: document.getElementById('beneficiary-apellido-materno').value,
        rfc: document.getElementById('beneficiary-rfc').value,
        curp: document.getElementById('beneficiary-curp').value,
        nacionalidad: document.getElementById('beneficiary-nacionalidad').value,
        participacion: parseFloat(document.getElementById('beneficiary-participacion').value),
        domicilio: document.getElementById('beneficiary-domicilio').value
    };
    
    // Obtener el cliente actual que se está editando
    const client = clients.find(c => c.id === editingClientId);
    if (!client || client.type !== 'moral') return;
    
    if (currentBeneficiaryId) {
        // Actualizar beneficiario existente
        const index = client.beneficiarios.findIndex(b => b.id === currentBeneficiaryId);
        client.beneficiarios[index] = { ...client.beneficiarios[index], ...beneficiaryData };
    } else {
        // Agregar nuevo beneficiario
        const newBeneficiary = {
            id: client.beneficiarios && client.beneficiarios.length > 0 ? 
                Math.max(...client.beneficiarios.map(b => b.id)) + 1 : 1,
            ...beneficiaryData
        };
        
        if (!client.beneficiarios) client.beneficiarios = [];
        client.beneficiarios.push(newBeneficiary);
    }
    
    // Cerrar modal y actualizar lista
    beneficiaryModal.classList.remove('active');
    loadBeneficiariosList(client.beneficiarios);
    
    alert('Beneficiario ' + (currentBeneficiaryId ? 'actualizado' : 'agregado') + ' correctamente.');
}

function resetBeneficiaryForm() {
    document.getElementById('beneficiary-form').reset();
    document.getElementById('beneficiary-id').value = '';
    document.getElementById('beneficiary-nacionalidad').value = 'Mexicana';
}

function loadBeneficiariosList(beneficiarios) {
    const beneficiariosList = document.getElementById('beneficiarios-list');
    beneficiariosList.innerHTML = '';
    
    if (!beneficiarios || beneficiarios.length === 0) {
        beneficiariosList.innerHTML = '<p>No se han agregado beneficiarios controladores.</p>';
        return;
    }
    
    beneficiarios.forEach(beneficiario => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <div class="file-name">
                <i class="fas fa-user-tie"></i>
                <span>${beneficiario.nombre} ${beneficiario.apellidoPaterno} ${beneficiario.apellidoMaterno} - ${beneficiario.participacion}%</span>
            </div>
            <div class="file-actions">
                <button class="action-btn" onclick="editBeneficiary(${beneficiario.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-danger action-btn" onclick="deleteBeneficiary(${beneficiario.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        beneficiariosList.appendChild(item);
    });
}

function editBeneficiary(beneficiaryId) {
    const client = clients.find(c => c.id === editingClientId);
    if (!client || !client.beneficiarios) return;
    
    const beneficiary = client.beneficiarios.find(b => b.id === beneficiaryId);
    if (!beneficiary) return;
    
    currentBeneficiaryId = beneficiaryId;
    
    // Llenar formulario de beneficiario
    document.getElementById('beneficiary-nombre').value = beneficiary.nombre;
    document.getElementById('beneficiary-apellido-paterno').value = beneficiary.apellidoPaterno;
    document.getElementById('beneficiary-apellido-materno').value = beneficiary.apellidoMaterno || '';
    document.getElementById('beneficiary-rfc').value = beneficiary.rfc;
    document.getElementById('beneficiary-curp').value = beneficiary.curp;
    document.getElementById('beneficiary-nacionalidad').value = beneficiary.nacionalidad;
    document.getElementById('beneficiary-participacion').value = beneficiary.participacion;
    document.getElementById('beneficiary-domicilio').value = beneficiary.domicilio;
    
    beneficiaryModal.classList.add('active');
}

function deleteBeneficiary(beneficiaryId) {
    if (confirm('¿Está seguro de eliminar este beneficiario?')) {
        const client = clients.find(c => c.id === editingClientId);
        if (client && client.beneficiarios) {
            client.beneficiarios = client.beneficiarios.filter(b => b.id !== beneficiaryId);
            loadBeneficiariosList(client.beneficiarios);
        }
    }
}

// Documentos
function loadDocumentosList(documentos, tipo) {
    const documentosList = document.getElementById(`documentos-${tipo}`);
    documentosList.innerHTML = '';
    
    if (!documentos || documentos.length === 0) {
        documentosList.innerHTML = '<p>No se han agregado documentos.</p>';
        return;
    }
    
    documentos.forEach(documento => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <div class="file-name">
                <i class="fas fa-file-pdf"></i>
                <span>${documento.nombre} (${documento.tipo})</span>
            </div>
            <div class="file-actions">
                <button class="action-btn" onclick="viewDocument('${documento.nombre}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="downloadDocument('${documento.nombre}')">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-danger action-btn" onclick="deleteDocument(${documento.id}, '${tipo}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        documentosList.appendChild(item);
    });
}

function viewDocument(nombre) {
    alert(`Vista previa del documento: ${nombre}\n\nEn un sistema real, aquí se mostraría el documento.`);
}

function downloadDocument(nombre) {
    alert(`Descargando documento: ${nombre}\n\nEn un sistema real, aquí se descargaría el documento.`);
}

function deleteDocument(documentoId, tipo) {
    if (confirm('¿Está seguro de eliminar este documento?')) {
        const client = clients.find(c => c.id === editingClientId);
        if (client && client.documentos) {
            client.documentos = client.documentos.filter(d => d.id !== documentoId);
            loadDocumentosList(client.documentos, tipo);
        }
    }
}

// Dashboard
function updateDashboard() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Operaciones este mes
    const opsThisMonth = operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate.getMonth() === currentMonth && opDate.getFullYear() === currentYear;
    });
    
    document.getElementById('ops-this-month').textContent = opsThisMonth.length;
    
    // Operaciones con aviso
    const opsWithNotice = operations.filter(op => op.requiresNotice);
    document.getElementById('ops-with-notice').textContent = opsWithNotice.length;
    
    // Operaciones por vencer (en los próximos 5 días)
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
    
    const opsPending = operations.filter(op => {
        const opDate = new Date(op.date);
        const today = new Date();
        return op.requiresNotice && !op.submitted && opDate > today && opDate <= fiveDaysFromNow;
    });
    
    document.getElementById('ops-pending').textContent = opsPending.length;
    
    // Operaciones vencidas
    const today = new Date();
    const opsExpired = operations.filter(op => {
        const opDate = new Date(op.date);
        return op.requiresNotice && !op.submitted && opDate < today;
    });
    
    document.getElementById('ops-expired').textContent = opsExpired.length;
    
    // Últimas operaciones
    const recentOps = operations.slice(-5).reverse();
    const recentOpsList = document.getElementById('recent-operations');
    recentOpsList.innerHTML = '';
    
    recentOps.forEach(op => {
        const client = clients.find(c => c.id === op.clientId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(op.date)}</td>
            <td>${client ? client.nombreCompleto || client.razonSocial : 'Cliente no encontrado'}</td>
            <td>${getActTypeText(op.type)}</td>
            <td>$${op.amount.toLocaleString('es-MX')}</td>
            <td>${op.requiresNotice ? (op.submitted ? 'Aviso Presentado' : '<span style="color: red;">Pendiente</span>') : 'No requiere'}</td>
        `;
        
        recentOpsList.appendChild(row);
    });
}

// Configuración
function saveConfig() {
    umaValue = parseFloat(document.getElementById('uma-value').value);
    
    // Guardar datos del notario (en un sistema real, se enviarían al servidor)
    const notarioData = {
        nombre: document.getElementById('notario-nombre').value,
        numero: document.getElementById('notario-numero').value,
        entidad: document.getElementById('notario-entidad').value,
        direccion: document.getElementById('notario-direccion').value,
        telefono: document.getElementById('notario-telefono').value,
        email: document.getElementById('notario-email').value,
        rfc: document.getElementById('notario-rfc').value
    };
    
    // Actualizar la información del usuario en la interfaz
    userDisplay.textContent = `Notario: ${notarioData.nombre} (Notaría ${notarioData.numero})`;
    
    alert('Configuración guardada correctamente.');
}

// Utilidades
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
}

function getActTypeText(type) {
    const types = {
        'compraventa': 'Compraventa de inmueble',
        'fideicomiso': 'Constitución de fideicomiso',
        'avaluo': 'Avalúo',
        'testamento': 'Testamento',
        'poder': 'Poder notarial',
        'tarjeta-servicios': 'Tarjetas de servicios',
        'otros': 'Otros actos'
    };
    
    return types[type] || type;
}

// Hacer funciones disponibles globalmente para los onclick
window.submitNotice = submitNotice;
window.editOperation = editOperation;
window.deleteOperation = deleteOperation;
window.editClient = editClient;
window.deleteClient = deleteClient;
window.editBeneficiary = editBeneficiary;
window.deleteBeneficiary = deleteBeneficiary;
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.deleteDocument = deleteDocument;
window.checkUmbrales = checkUmbrales;