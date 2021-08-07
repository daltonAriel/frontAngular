import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Vistas/login/login.component';
import { MenuComponent } from './Vistas/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NuevoClienteComponent } from './Vistas/Clientes/nuevo-cliente/nuevo-cliente.component';
import { ListarClienteComponent } from './Vistas/Clientes/listar-cliente/listar-cliente.component';
import { ListarCategoriaComponent } from "./Vistas/Categorias/listar-categoria/ListarCategoriaComponent";
import { NuevaCategoriaComponent } from './Vistas/Categorias/nueva-categoria/nueva-categoria.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from './Vistas/productos/productos.component';
import { ListarProveedorComponent } from './Vistas/Proveedores/listar-proveedor/listar-proveedor.component';
import { NuevoProveedorComponent } from './Vistas/Proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { NosotrosComponent } from './Vistas/nosotros/nosotros.component';
import { NuevoUsuarioComponent } from './Vistas/Usuarios/nuevo-usuario/nuevo-usuario.component';
import { ListarUsuarioComponent } from './Vistas/Usuarios/listar-usuario/listar-usuario.component';
import { ListarProductoresComponent } from './Vistas/Productores/listar-productores/listar-productores.component';
import { NuevoProductoresComponent } from './Vistas/Productores/nuevo-productores/nuevo-productores.component';
import {CargarScriptsService} from './Servicios/cargar-scripts.service';
import { ListarDetalleProductosComponent } from './Vistas/detalleProductos/listar-detalle-productos/listar-detalle-productos.component';
import { NuevoDetalleProductosComponent } from './Vistas/detalleProductos/nuevo-detalle-productos/nuevo-detalle-productos.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NuevoClienteComponent,
    ListarClienteComponent,
    ListarCategoriaComponent,
    NuevaCategoriaComponent,
    ProductosComponent,
    ListarProveedorComponent,
    NuevoProveedorComponent,
    NosotrosComponent,
    NuevoUsuarioComponent,
    ListarUsuarioComponent,
    ListarProductoresComponent,
    NuevoProductoresComponent,
    ListarDetalleProductosComponent,
    NuevoDetalleProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    CargarScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
