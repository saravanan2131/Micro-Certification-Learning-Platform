// Initialize 3D Blood Cells Background
function initBloodCellBackground() {
    const container = document.getElementById('blood-cell-container');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create blood cells
    const bloodCells = [];
    const cellGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const cellMaterial = new THREE.MeshPhongMaterial({
        color: 0xff4757,
        shininess: 100,
        transparent: true,
        opacity: 0.7
    });
    
    // Create 20 blood cells
    for (let i = 0; i < 20; i++) {
        const cell = new THREE.Mesh(cellGeometry, cellMaterial);
        
        // Random position
        cell.position.x = Math.random() * 20 - 10;
        cell.position.y = Math.random() * 20 - 10;
        cell.position.z = Math.random() * 20 - 10;
        
        // Random size
        const scale = Math.random() * 0.5 + 0.5;
        cell.scale.set(scale, scale, scale);
        
        scene.add(cell);
        bloodCells.push({
            mesh: cell,
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Camera position
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate and move blood cells
        bloodCells.forEach(cell => {
            cell.mesh.rotation.x += cell.rotationSpeed;
            cell.mesh.rotation.y += cell.rotationSpeed;
            
            // Move in a circular pattern
            cell.mesh.position.x = Math.sin(Date.now() * cell.speed) * 10;
            cell.mesh.position.y = Math.cos(Date.now() * cell.speed) * 10;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Charts
function initCharts() {
    // Monthly Donations Chart
    const donationsCtx = document.getElementById('donationsChart').getContext('2d');
    const donationsChart = new Chart(donationsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Blood Donations',
                data: [120, 150, 180, 210, 240, 200, 230, 250],
                backgroundColor: 'rgba(255, 71, 87, 0.2)',
                borderColor: 'rgba(255, 71, 87, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    // Blood Type Distribution Chart
    const bloodTypeCtx = document.getElementById('bloodTypeChart').getContext('2d');
    const bloodTypeChart = new Chart(bloodTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [{
                data: [20, 5, 15, 4, 8, 2, 35, 11],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 71, 87, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'white'
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Module Navigation
function setupModuleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and modules
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            modules.forEach(module => module.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding module
            const moduleId = link.getAttribute('data-module') + '-module';
            document.getElementById(moduleId).classList.add('active');
        });
    });
}

// Notification Panel
function setupNotificationPanel() {
    const notificationBtn = document.querySelector('.user-profile');
    const notificationPanel = document.querySelector('.notification-panel');
    const closeBtn = document.querySelector('.close-notifications');
    
    notificationBtn.addEventListener('click', () => {
        notificationPanel.classList.toggle('active');
    });
    
    closeBtn.addEventListener('click', () => {
        notificationPanel.classList.remove('active');
    });
}

// Quick Action Button
function setupQuickActionButton() {
    const quickActionBtn = document.querySelector('.quick-action-btn');
    
    quickActionBtn.addEventListener('click', () => {
        // Show a modal or perform an action
        alert('Quick action triggered! This could open a form to add a new donor or schedule an appointment.');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBloodCellBackground();
    initCharts();
    setupModuleNavigation();
    setupNotificationPanel();
    setupQuickActionButton();
});
