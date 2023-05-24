<template>
    <div>
        <Sidebar/>
        <div class="main-content">
        <TopNav/>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      usuarios
                    </h6>
                    <!-- Title -->
                    <h1 class="header-title">
                      Editar Usuario
                    </h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/UsuarioPanel" class="nav-link">Todos los usuarios</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link to="/UsuarioPanel/create" class="nav-link active">Nuevo usuario</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Form -->

            <template v-if="dataUsuario">
              <div>
                      <div class="row" >
                      <div class="col-12 col-md-6">
                                  <!-- First name -->
                                  <div class="form-group">
                                    <!-- Label -->
                                    <label class="form-label">
                                      Nombres
                                    </label>
                                    <!-- Input -->
                                    <input type="text" class="form-control" v-model="usuarioPanel.nombres" placeholder="Nombres">
                                  </div>
                                </div>
                                <div class="col-12 col-md-6">
                                  <!-- Last name -->
                                  <div class="form-group">
                                    <!-- Label -->
                                    <label class="form-label">
                                      Apellidos
                                    </label>
                                    <!-- Input -->
                                    <input type="text" class="form-control" v-model="usuarioPanel.apellidos" placeholder="Apellidos">
                                  </div>
                                </div>
                                <div class="col-6">
                                  <!-- Email address -->
                                  <div class="form-group">
                                    <!-- Label -->
                                    <label class="mb-1">
                                      Correo electrónico
                                    </label>
                                    <!-- Form text -->
                                    <small class="form-text text-muted">
                                    
                                    </small>
                                    <!-- Input -->
                                    <input type="email" class="form-control" v-model="usuarioPanel.email" placeholder="name@example.com">
                                  </div>
                                </div>
                                <div class="col-12 col-md-6">
                                  <!-- Birthday -->
                                  <div class="form-group">
                                    <!-- Label -->
                                    <label class="form-label">
                                      Cargo
                                    </label>
                                    <!-- Input -->
                                    <select name="" class="form-select" v-model="usuarioPanel.rol">
                                        <option value="" disabled selected>Seleccionar</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Vendedor">Auxiliar</option>
                                    </select>
                                  </div>
                                </div>
                          </div> <!-- / .row -->
                              <hr class="my-5" >
                              <button type="button" class="btn btn-primary" v-on:click="validar()" >
                                Actualizar Usuario
                              </button>
                              </div>
            </template>

            <template v-if="!dataUsuario">
              <div>
               <Error/>                 
              </div>
            </template>

            
            <br><br>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>

        
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TopNav from '@/components/TopNav.vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import Error from '@/components/Error.vue'

export default {
  name: 'EditarUsuarioPanel',
  components:{
    Sidebar,
    TopNav,
    RouterLink,
    Error
},
  data(){
    return{
      usuarioPanel:{
        nombres:'',
        apellidos:'',
        email:'',
        rol:''
      },
      id:this.$route.params.id,
      dataUsuario:false

    }
  },
  methods:{
    getUsuarioById(){
      axios.get(this.$url+'/getUserById/'+this.id,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        if(result.data!=""){
          this.dataUsuario=true;
          this.usuarioPanel=result.data
        }
        console.log(this.dataUsuario)
        console.log(result)
      }).catch((error)=>{
        console.log(this.dataUsuario)
        console.log(error)
       })
    },
    actualizarUsuarioPanel(){
      
      axios.put(this.$url+'/updateUsuarioPanel/'+this.id,this.usuarioPanel,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': this.$store.state.token
      }
      }).then((result)=>{
        console.log(result)
        this.$notify({
            group: 'foo',
            title: 'SUCCES',
            text: 'Se actualizco correctamente',
            type: 'succes'
          });
          this.$router.push({name:'ListarUsuarioPanel'})
      }).catch((error)=>{
        console.log(error)
      })
    },
    validar(){
      console.log(this.usuarioPanel);

      if(!this.usuarioPanel.nombres){
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese un nombre',
            type: 'error'
          });
        }
      else if(!this.usuarioPanel.apellidos){
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese apellidos',
            type: 'error'
          });
        }
      else if(!this.usuarioPanel.email){
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese un correo electronico',
            type: 'error'
          });
        }
      else if(!this.usuarioPanel.rol){
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese un rol',
            type: 'error'
          });
        }
      else{
         this.actualizarUsuarioPanel()
      }
    
    },
    // crearUsuarioPanel(){
    //   axios.post(this.$url+'/registro_usuario_admin',this.usuarioPanel,{
    //     headers:{
    //       'Content-Type': 'application/json',
          
    //     }
    //   }).then((result)=>{
    //     console.log(result)
    //     if(result.data.data==undefined){
    //       this.$notify({
    //         group: 'foo',
    //         title: 'ERROR',
    //         text: result.data.message,
    //         type: 'error'
    //       });
    //     }
    //     else{
    //       this.$notify({
    //         group: 'foo',
    //         title: 'SUCCESS',
    //         text: 'Se registró el usuario correctamente',
    //         type: 'success'
    //       });
    //     }
    //     this.$router.push({name:'ListarUsuarioPanel'})
    //   }).catch((error)=>{
    //     console.log(error)
    //   })
    // }
    
  },
  mounted(){
    console.log(this.id)
  },
  beforeMount(){
    this.getUsuarioById();
  }
  
  
}
</script>
