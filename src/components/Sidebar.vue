<template>
<nav class="navbar navbar-vertical fixed-start navbar-expand-md navbar-light" id="sidebar">
      <div class="container-fluid">
    
        <!-- Toggler -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <!-- Brand -->
        <a class="navbar-brand" href="./index.html">
          <img src="" class="navbar-brand-img mx-auto" alt="...">
          LAGONDA
        </a>
    
        <!-- User (xs) -->  
        <div class="navbar-user d-md-none">
    
          <!-- Dropdown -->
          <div class="dropdown">
    
            <!-- Toggle -->
            <a href="#" id="sidebarIcon" class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class="avatar avatar-sm avatar-online">
                <img src="/assets/img/lagonda.PNG" class="avatar-img rounded-circle" alt="...">
              </div>
            </a>
    
            <!-- Menu -->
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarIcon">
              <a href="./profile-posts.html" class="dropdown-item">Profile</a>
              <a href="./account-general.html" class="dropdown-item">Settings</a>
              <hr class="dropdown-divider">
              <a href="./sign-in.html" class="dropdown-item">Logout</a>
            </div>
    
          </div>
    
        </div>
    
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidebarCollapse">
    
          <!-- Form -->
          <form class="mt-4 mb-3 d-md-none">
            <div class="input-group input-group-rounded input-group-merge input-group-reverse">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-text">
                <span class="fe fe-search"></span>
              </div>
            </div>
          </form>
    
          <!-- Navigation -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarDashboards">
                <i class="fe fe-home"></i> Dashboards
              </a>
              <div class="collapse show" id="sidebarDashboards">
                <ul class="nav nav-sm flex-column">
                  <!-- <li class="nav-item">
                    <a href="./index.html" class="nav-link active">
                      Default
                    </a>
                  </li> -->
                  <!-- <li class="nav-item">
                    <a href="./dashboard-project-management.html" class="nav-link ">
                      Project Management
                    </a>
                  </li> -->
                  <li class="nav-item">
                    <a href="./dashboard-ecommerce.html" class="nav-link ">
                      E-Commerce
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            
          </ul>
          <!-- //Rayita -->
          <hr class="navbar-divider my-3">
          <h6 class="navbar-heading">Gestión</h6>
          <ul class="navbar-nav mb-md-4">
            <li class="nav-item">
              <router-link to="/UsuarioPanel" class="nav-link" active-class="active">
                <i class="fe fe-user"></i>Usuarios
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ProductoPanel/create" class="nav-link" active-class="active">
                <i class="fe fe-package"></i> Productos
              </router-link>
            </li>
          </ul>
    
          <!-- Push content down -->
          <div class="mt-auto"></div>
            <!-- User (md) -->
            <div class="navbar-user d-none d-md-flex" id="sidebarUser">
    
              <!-- Icon -->
              <a class="navbar-user-link" data-bs-toggle="offcanvas" href="#sidebarOffcanvasActivity" aria-controls="sidebarOffcanvasActivity">
                <span class="icon">
                  <i class="fe fe-bell"></i>
                </span>
              </a>
    
              <!-- Dropup -->
              <div class="dropup">
    
                <!-- Toggle -->
                <a href="#" id="sidebarIconCopy" class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div class="avatar avatar-sm avatar-online">
                    <img src="/assets/img/lagonda.PNG" class="avatar-img rounded-circle" alt="..." style="-webkit-mask-image:none">
                  </div>
                </a>
      
                <!-- Menu -->
                <div class="dropdown-menu" aria-labelledby="sidebarIconCopy">
                  <a href="./profile-posts.html" class="dropdown-item">Profile</a>
                  <a href="./account-general.html" class="dropdown-item">Settings</a>
                  <hr class="dropdown-divider">
                  <a href="./sign-in.html" class="dropdown-item">Logout</a>
                </div>
    
              </div>
    
              <!-- Icon -->
              <a class="navbar-user-link" data-bs-toggle="offcanvas" href="#sidebarOffcanvasSearch" aria-controls="sidebarOffcanvasSearch">
                <span class="icon">
                  <i class="fe fe-search"></i>
                </span>
              </a>
    
            </div>
    
        </div> <!-- / .navbar-collapse -->
    
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  
}
</script>


