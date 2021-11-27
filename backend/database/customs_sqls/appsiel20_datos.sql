-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2021 a las 14:46:16
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
-- Volcado de datos para la tabla `core_companies`
--

INSERT INTO `core_companies` (`id`, `tradename`, `url_image`, `state`, `created_at`, `updated_at`) VALUES
(1, 'DEMO APPSIEL', '', 'Activo', '2021-11-27 13:45:15', '2021-11-27 13:45:15');

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
-- Volcado de datos para la tabla `sys_models`
--

INSERT INTO `sys_models` (`id`, `label`, `name`, `name_space`, `created_at`, `updated_at`) VALUES
(1, 'Usuarios', 'user', 'App\\User', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(2, 'Contactos', 'contact', 'App\\Core\\Contact', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(3, 'Bodegas', 'warehouse', 'App\\Inventories\\Warehouse', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(4, 'Items', 'item', 'App\\Inventories\\Item', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(5, 'Zonas', 'zone', 'App\\Sales\\Zone', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(6, 'Clases de clientes', 'customer_class', 'App\\Sales\\CustomerClass', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(7, 'Clientes', 'customer', 'App\\Sales\\Customer', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(8, 'Clases de proveedores', 'supplier_class', 'App\\Purchases\\SupplierClass', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(9, 'Proveedores', 'supplier', 'App\\Purchases\\Supplier', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(10, 'Entradas de Almacén', 'inv_warehouse_entries_index', 'App\\Inventories\\WarehouseEntry', '2021-11-26 20:28:32', '2021-11-26 20:28:32'),
(11, 'Salidas de Almacén', 'inv_warehouse_outputs_index', 'App\\Inventories\\WarehouseOutput', '2021-11-26 20:28:32', '2021-11-26 20:28:32');

--
-- Volcado de datos para la tabla `sys_permissions`
--

INSERT INTO `sys_permissions` (`id`, `application_id`, `model_id`, `name`, `label`, `url`, `parent`, `position`, `visible`, `fa_icon`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'core_users_index', 'Usuarios', 'api/core/users', 0, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(2, 1, 2, 'core_contacts_index', 'Contactos', 'api/core/contacts', 0, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(3, 2, 3, 'inv_warehouses_index', 'Bodegas', 'api/inv/warehouses', 11, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(4, 2, 4, 'inv_items_index', 'Ítems', 'api/inv/items', 11, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(5, 5, 6, 'sales_customers_classes_index', 'Clases de clientes', 'api/sales/customer_classes', 12, 3, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(6, 5, 5, 'sales_zones_index', 'Zonas', 'api/sales/zones', 12, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(7, 5, 7, 'sales_customers_index', 'Clientes', 'api/sales/customers', 12, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(8, 4, 8, 'purch_supliers_classes_index', 'Clases de proveedores', 'api/purchases/supliers_classes', 13, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(9, 4, 9, 'purch_supliers_index', 'Proveedores', 'api/purchases/supliers', 13, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(11, 2, NULL, 'inv_catalogs', 'Catálogos', 'api/inv/catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(12, 5, NULL, 'sales_catalogs', 'Catálogos', 'api/sales/catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(13, 5, NULL, 'purch_catalogs', 'Catálogos', 'api/purchases/catalogs', 0, 5, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(14, 2, NULL, 'inv_transactions', 'Transacciones', '', 0, 2, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(15, 2, 10, 'inv_warehouse_entries_index', 'Entradas de Almacén', 'api/inventories/warehouse_entries', 14, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46'),
(16, 2, 11, 'inv_warehouse_outputs_index', 'Salidas de Almacén', 'api/inventories/warehouse_outputs', 14, 1, 1, '', '2021-11-26 22:26:46', '2021-11-26 22:26:46');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
