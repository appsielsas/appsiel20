-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2021 a las 19:47:12
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appsiel20`
--

--
-- Volcado de datos para la tabla `sys_actions`
--

INSERT INTO `sys_actions` (`id`, `label`, `type`, `method`, `prefix`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Crear', 'create', 'POST', 'web', 'fas fa-plus', '2021-12-02 00:46:30', '2021-12-02 00:46:30'),
(2, 'Modificar', 'edit', 'PUT', 'web', 'fas fa-pen', '2021-12-02 00:46:30', '2021-12-02 00:46:30'),
(3, 'Eliminar', 'delete', 'DELETE', 'web', 'fas fa-trash-alt', '2021-12-02 00:46:30', '2021-12-02 00:46:30'),
(4, 'Cambiar Contraseña', 'generic', 'PUT', 'web', 'fas fa-key', '2021-12-02 00:46:30', '2021-12-02 00:46:30'),
(5, 'Duplicar', 'duplicate', 'POST', 'web/duplicate', 'fas fa-clone', '2021-12-02 00:46:30', '2021-12-02 00:46:30');

--
-- Volcado de datos para la tabla `sys_applications`
--

INSERT INTO `sys_applications` (`id`, `label`, `name`, `scope`, `definition`, `position`, `url_image`, `state`, `created_at`, `updated_at`) VALUES
(1, 'Configuración', 'configuration', 'CORE', 'Todas las opciones del núcleo del sistema y comunes a todas las aplicaciones.', 99, 'https://appsiel.com.co/el_software/assets/iconos_2021/configuracion.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28'),
(2, 'Inventarios', 'inventories', 'GESTIÓN EMPRESARIAL', 'Gestión de bodegas, items y costos.', 2, 'https://appsiel.com.co/el_software/assets/iconos_2021/inventarios.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28'),
(4, 'Compras', 'purchases', 'GESTIÓN EMPRESARIAL', 'Gestión de proveedores, compras y cuentas por pagar.', 3, 'https://appsiel.com.co/el_software/assets/iconos_2021/compras.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28'),
(5, 'Ventas', 'sales', 'GESTIÓN EMPRESARIAL', 'Gestión de clientes, ventas y cuentas por cobrar.', 4, 'https://appsiel.com.co/el_software/assets/iconos_2021/ventas.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28'),
(6, 'Tesorería', 'treasury', 'GESTIÓN EMPRESARIAL', 'Gestión de cajas, bancos, ingresos y gastos.', 5, 'https://appsiel.com.co/el_software/assets/iconos_2021/tesoreria.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28'),
(7, 'Dashboard', 'dashboard', 'GESTIÓN EMPRESARIAL', 'Tablero de estadísticas, métricas y visión general del negocio.', 1, 'https://appsiel.com.co/el_software/assets/iconos_2021/dashboard.png', 'Activo', '2021-11-26 20:16:28', '2021-11-26 20:16:28');

--
-- Volcado de datos para la tabla `sys_fields`
--

INSERT INTO `sys_fields` (`id`, `label`, `type`, `name`, `options`, `value`, `attributes`, `definition`, `created_at`, `updated_at`) VALUES
(1, 'Nombre', 'text', 'name', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(2, 'E-mail', 'email', 'email', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(3, 'Contraseña', 'password', 'password', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(4, 'Confirmar contraseña', 'password', 'password_confirmation', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(5, 'Nombre comercial', 'text', 'tradename', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(6, 'Imágen', 'text', 'url_image', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(7, 'Estado', 'select', 'state', '{\"0\":\"Inactivo\",\"1\":\"Activo\"}', '1', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(8, 'Empresa', 'select', 'company_id', 'model_companies', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(9, 'Etiqueta', 'text', 'label', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(10, 'Tipo', 'select', 'type', '{\"text\":\"Texto\",\"numeric\":\"Número\", \"select\":\"Select\", \"monetary\":\"Monetario\", \"textarea\":\"TextArea\", \"password\":\"Password\", \"email\":\"E-mail\", \"hidden\":\"Oculto\", \"date\":\"Fecha\", \"time\":\"Hora\", \"checkbox\":\"Casillas de verificación\", \"radio\":\"Botones de opción\", \"label\":\"Etiqueta\", \"custom\":\"Personalizado\", \"constant\":\"Constante\", \"image\":\"Imágen\", \"file\":\"Archivo adjunto\", \"json_simple\":\"Json Simple\",\"autocomplete\":\"Autocompletado\"}', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(11, 'Opciones', 'textarea', 'options', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(12, 'Valor', 'text', 'value', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(13, 'Atributos', 'textarea', 'attributes', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(14, 'Definición', 'textarea', 'definition', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(15, 'Número dentificación', 'text', 'identity_number', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(16, 'Dirección', 'text', 'address', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(17, 'Teléfono', 'text', 'phone', '', '', '', '', '2021-12-01 23:44:14', '2021-12-01 23:44:14'),
(18, 'Name Space', 'text', 'name_space', '', '', '', '', '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(19, 'Modelo', 'select', 'model_id', 'model_models', '', '', '', '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(20, 'Campo', 'select', 'field_id', 'model_fields', '', '', '', '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(21, 'Posición', 'text', 'position', '', '', '', '', '2021-12-09 23:44:14', '2021-12-09 23:44:14'),
(22, 'Requerido', 'select', 'required', '{\"0\":\"No\",\"1\":\"Sí\"}', '1', '', '', '2021-12-09 23:44:14', '2021-12-09 23:44:14'),
(23, 'Editable', 'select', 'editable', '{\"0\":\"No\",\"1\":\"Sí\"}', '1', '', '', '2021-12-09 23:44:14', '2021-12-09 23:44:14'),
(24, 'Único', 'select', 'unique', '{\"0\":\"No\",\"1\":\"Sí\"}', '1', '', '', '2021-12-09 23:44:14', '2021-12-09 23:44:14'),
(25, 'Acción', 'select', 'action_id', 'model_actions', '', '', '', '2021-12-09 19:31:21', '2021-12-09 19:31:21');

--
-- Volcado de datos para la tabla `sys_models`
--

INSERT INTO `sys_models` (`id`, `label`, `name`, `name_space`, `created_at`, `updated_at`) VALUES
(1, 'Usuarios', 'user', 'App\\Appsiel\\System\\Models\\User', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(2, 'Contactos', 'contact', 'App\\Appsiel\\Core\\Models\\Contact', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(3, 'Bodegas', 'warehouse', 'App\\Inventories\\Warehouse', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(4, 'Items', 'item', 'App\\Inventories\\Item', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(5, 'Zonas', 'zone', 'App\\Sales\\Zone', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(6, 'Clases de clientes', 'customer_class', 'App\\Appsiel\\Sales\\CustomerClass', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(7, 'Clientes', 'customer', 'App\\Appsiel\\Sales\\Customer', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(8, 'Clases de proveedores', 'supplier_class', 'App\\Appsiel\\Purchases\\SupplierClass', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(9, 'Proveedores', 'supplier', 'App\\Appsiel\\Purchases\\Supplier', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(10, 'Entradas de Almacén', 'inv_warehouse_entries_index', 'App\\Appsiel\\Inventories\\WarehouseEntry', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(11, 'Salidas de Almacén', 'inv_warehouse_outputs_index', 'App\\Appsiel\\Inventories\\WarehouseOutput', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(12, 'Empresas', 'companies', 'App\\Appsiel\\Core\\Models\\Company', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(13, 'Asignaciones de Campos a Modelos', 'model_has_fields', 'App\\Appsiel\\System\\Models\\ModelHasField', '2021-12-09 20:28:32', '2021-12-09 20:28:32'),
(14, 'Asignaciones de Acciones a Modelos', 'model_has_actions', 'App\\Appsiel\\System\\Models\\ModelHasAction', '2021-12-09 20:28:32', '2021-12-09 20:28:32'),
(15, 'Modelos', 'models', 'App\\Appsiel\\System\\Models\\SysModel', '2021-12-09 20:28:32', '2021-12-09 20:28:32'),
(16, 'Campos', 'fields', 'App\\Appsiel\\System\\Models\\Field', '2021-12-09 20:28:32', '2021-12-09 20:28:32'),
(17, 'Aplicaciones', 'applications', 'App\\Appsiel\\System\\Models\\Application', '2021-12-11 17:48:58', '2021-12-11 17:48:58'),
(18, 'Categorías', 'categories', 'App\\Appsiel\\Inventories\\Category', '2021-12-11 18:07:14', '2021-12-11 18:07:14');

--
-- Volcado de datos para la tabla `sys_model_has_actions`
--

INSERT INTO `sys_model_has_actions` (`id`, `model_id`, `action_id`, `position`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(2, 1, 2, 2, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(3, 1, 3, 3, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(4, 1, 4, 4, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(5, 2, 1, 1, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(6, 2, 2, 2, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(7, 2, 3, 3, '2021-12-02 00:51:31', '2021-12-02 00:51:31'),
(9, 13, 1, 2, '2021-12-09 19:28:25', '2021-12-09 19:28:25'),
(11, 13, 3, 2, '2021-12-09 19:28:25', '2021-12-09 19:28:25'),
(12, 14, 1, 2, '2021-12-09 19:31:21', '2021-12-09 19:31:21'),
(13, 14, 3, 4, '2021-12-09 19:31:21', '2021-12-09 19:31:21'),
(14, 15, 1, 2, '2021-12-09 20:26:01', '2021-12-09 20:26:01'),
(15, 15, 2, 4, '2021-12-09 20:26:01', '2021-12-09 20:26:01');

--
-- Volcado de datos para la tabla `sys_model_has_fields`
--

INSERT INTO `sys_model_has_fields` (`id`, `model_id`, `field_id`, `position`, `required`, `editable`, `unique`, `created_at`, `updated_at`) VALUES
(1, 12, 5, 1, 1, 1, 0, '2021-12-02 00:21:56', '2021-12-02 00:21:56'),
(2, 12, 6, 2, 1, 1, 0, '2021-12-02 00:24:08', '2021-12-02 00:24:08'),
(3, 12, 7, 3, 1, 1, 0, '2021-12-02 00:24:08', '2021-12-02 00:24:08'),
(4, 1, 1, 1, 1, 1, 0, '2021-12-02 00:27:44', '2021-12-02 00:27:44'),
(5, 1, 2, 2, 1, 1, 1, '2021-12-02 00:27:44', '2021-12-02 00:27:44'),
(6, 1, 3, 3, 1, 0, 0, '2021-12-02 00:27:44', '2021-12-02 00:27:44'),
(7, 1, 4, 4, 1, 0, 0, '2021-12-02 00:27:44', '2021-12-02 00:27:44'),
(26, 2, 1, 1, 1, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(27, 2, 5, 2, 0, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(28, 2, 16, 3, 0, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(29, 2, 17, 4, 1, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(30, 2, 2, 5, 0, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(31, 2, 6, 6, 0, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(32, 2, 7, 7, 1, 1, 0, '2021-12-02 00:37:16', '2021-12-02 00:37:16'),
(33, 1, 8, 2, 1, 1, 0, '2021-12-09 16:26:17', '2021-12-09 16:26:17'),
(37, 15, 9, 2, 1, 1, 0, '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(38, 15, 1, 4, 1, 1, 0, '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(39, 15, 18, 6, 1, 1, 0, '2021-12-09 18:18:47', '2021-12-09 18:18:47'),
(40, 13, 19, 2, 1, 1, 0, '2021-12-09 18:28:53', '2021-12-09 18:28:53'),
(42, 13, 20, 4, 1, 1, 0, '2021-12-09 18:33:19', '2021-12-09 18:33:19'),
(43, 13, 21, 6, 1, 1, 0, '2021-12-09 18:33:19', '2021-12-09 18:33:19'),
(44, 13, 22, 8, 1, 1, 0, '2021-12-09 18:33:19', '2021-12-09 18:33:19'),
(45, 13, 23, 10, 1, 1, 0, '2021-12-09 18:33:19', '2021-12-09 18:33:19'),
(46, 13, 24, 12, 1, 1, 0, '2021-12-09 18:33:19', '2021-12-09 18:33:19'),
(48, 14, 19, 2, 1, 1, 0, '2021-12-09 19:31:21', '2021-12-09 19:31:21'),
(49, 14, 25, 4, 1, 1, 0, '2021-12-09 19:31:21', '2021-12-09 19:31:21'),
(50, 14, 21, 1, 1, 1, 0, '2021-12-09 19:31:21', '2021-12-09 19:31:21');

--
-- Volcado de datos para la tabla `sys_permissions`
--

INSERT INTO `sys_permissions` (`id`, `application_id`, `model_id`, `name`, `label`, `url`, `parent`, `position`, `visible`, `fa_icon`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'core_users_index', 'Usuarios', 'crud', 19, 1, 0, 'users', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(2, 1, 2, 'core_contacts_index', 'Contactos', 'crud', 19, 2, 0, 'address-book', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(3, 2, 3, 'inv_warehouses_index', 'Bodegas', 'crud', 11, 2, 0, 'warehouse', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(4, 2, 4, 'inv_items_index', 'Ítems', 'crud', 11, 1, 0, 'archive', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(5, 5, 6, 'sales_customers_classes_index', 'Clases de clientes', 'crud', 12, 3, 0, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(6, 5, 5, 'sales_zones_index', 'Zonas', 'crud', 12, 2, 0, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(7, 5, 7, 'sales_customers_index', 'Clientes', 'crud', 12, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(8, 4, 8, 'purch_supliers_classes_index', 'Clases de proveedores', 'crud', 13, 2, 0, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(9, 4, 9, 'purch_supliers_index', 'Proveedores', 'model_index', 13, 1, 0, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(11, 2, NULL, 'inv_catalogs', 'Catálogos', 'app_catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(12, 5, NULL, 'sales_catalogs', 'Catálogos', 'app_catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(13, 5, NULL, 'purch_catalogs', 'Catálogos', 'app_catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(14, 2, NULL, 'inv_transactions', 'Transacciones', '', 0, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(15, 2, 10, 'inv_warehouse_entries_index', 'Entradas de Almacén', 'model_index', 14, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(16, 2, 11, 'inv_warehouse_outputs_index', 'Salidas de Almacén', 'model_index', 14, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(18, 7, NULL, 'dash_reports', 'Informes', 'model_index', 0, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(19, 1, NULL, 'conf_catalogs', 'Catálogos', 'app_catalogs', 0, 1, 1, '', '2021-12-03 16:06:21', '2021-12-03 16:06:21'),
(20, 1, 15, 'sys_models', 'Modelos', 'crud', 19, 2, 0, 'road', '2021-12-09 19:42:46', '2021-12-09 19:42:46'),
(21, 1, 16, 'sys_fields', 'Campos', 'crud', 19, 3, 0, 'layer-group', '2021-12-09 19:42:46', '2021-12-09 19:42:46'),
(22, 1, 17, 'sys_applications', 'Aplicaciones', 'crud', 19, 1, 0, 'cubes', '2021-12-11 17:48:58', '2021-12-11 17:48:58'),
(23, 2, 18, 'inv_categories', 'Categorías', 'crud', 11, 1, 0, 'sitemap', '2021-12-11 18:09:33', '2021-12-11 18:09:33');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
