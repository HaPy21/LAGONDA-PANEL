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
                      ventas
                    </h6>
                    <!-- Title -->
                    <h1 class="header-title">
                      Dashboard Ventas
                    </h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/Ventas" class="nav-link" >Todos las ventas</router-link>
                      </li>
                      <li class="nav-item">
                        <a h class="nav-link active">
                            Dashboard Ventas
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Form -->
            <form>     
                <div class="row">
                  <div class="col-md-8">  
                  <canvas id="myChart" width="200%" height="100%"/>
                  </div> 
                  <div class="col-md-4">  
                   <canvas id="barChart" width="100%" height="103%"/>
                  </div>                  
                </div>
                <div class="row">
                  <div class="col-md-2">  
                  <canvas id="doughnutChart" width="50" height="50"/>
                  </div>
                  <div class="col-md-2">  
                  <canvas id="doughnutChart2" width="50" height="50"/>
                  </div>
                  <div class="col-md-2">
                    
                  </div>
                </div>
                 
            </form>
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
import 'chart.js'
import Chart from 'chart.js/auto'

export default {
  name: 'DashboardVentas',
  components:{
    Sidebar,
    TopNav    
  },
   
  mounted(){
    console.log('Component mounted')

    const ctx = document.getElementById('myChart');
    const doughnutCtx = document.getElementById('doughnutChart');
    const doughnut2Ctx = document.getElementById('doughnutChart2');
    const barCtx = document.getElementById('barChart');
    

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'ventas del mes',
        data: [18000, 20000,  28000, 17000, 20000],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0
      }]
    };

    const barLabels = ['Neumáticos', 'Rines'];
    const barData = {
    labels: barLabels,
    datasets: [{
      label: 'Ventas por producto',
      data: [5000, 2500],
      backgroundColor: ['#36A2EB', '#36A2EB']
    }]
  };

  const doughnutLabels = ['cantidad de ventas'];
    const doughnutData = {
    labels: doughnutLabels,
    datasets: [{
      label: 'ventas realizadas',
      data: [80],
      backgroundColor: ['#36A2EB']
    }]
  };

  const doughnutLabels2 = ['total de ventas'];
    const doughnutData2 = {
    labels: doughnutLabels2,
    datasets: [{
      label: 'venta neta',
      data: [80],
      backgroundColor: ['#36A2EB'],
      circumference: 305,
    }]
  };

  const doughnutOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return ' '+value + '%' +' valor neto';
        }
      }
    }
  }
};

    const barChart = new Chart(barCtx,{
      type: 'bar',
      data: barData,
    });

    const myChart = new Chart(ctx,{
      type: 'line',
      data: data,
    });

    const doughnutChart = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: doughnutData,
  });

  const doughnutChart2 = new Chart(doughnut2Ctx, {
    type: 'doughnut',
    data: doughnutData2,
    options: doughnutOptions
  });

    myChart;
    doughnutChart;
    doughnutChart2;
    barChart;
  },
  



  methods:{
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
        this.crearUsuarioPanel();
      }
    
    },
    crearUsuarioPanel(){
      axios.post(this.$url+'/registro_usuario_admin',this.usuarioPanel,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        console.log(result)
        if(result.data.data==undefined){
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: result.data.message,
            type: 'error'
          });
        }
        else{
          this.$notify({
            group: 'foo',
            title: 'SUCCESS',
            text: 'Se registró el usuario correctamente',
            type: 'success'
          });
        }
        this.$router.push({name:'ListarUsuarioPanel'})
      }).catch((error)=>{
        console.log(error)
      })
    }
    
  },
  
}
</script>
