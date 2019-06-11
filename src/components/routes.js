import AuthLogin from './login'
import Product from './admin-module/product'
import ProductCreate from './admin-module/product/Create'
import ProductEdit from './admin-module/product/Edit'
import Category from './admin-module/category'
import CategoryCreate from './admin-module/category/Create'
import CategoryEdit from './admin-module/category/Edit'

const breadcrumbs = [
  { title: 'Home', name: 'home' }
];

const admin = {
  user: 'admin',
  requiredAuth: true,
  breadcrumbs,
};

const adminModule = [
  { meta: { ...admin }, path: '/', redirect: { name: 'product' } },
  {
    name: 'auth-login', path: '/login', component: AuthLogin, meta: {
      ...admin, requiredAuth: false
    }
  },
  {
    name: 'product',
    path: '/product',
    component: Product,
    meta: {
      ...admin,
      requiredAuth: true
    }
  },
  {
    name: 'product-create',
    path: '/product/create',
    component: ProductCreate,
    meta: {
      ...admin,
      requiredAuth: true
    }
  },
  {
    name: 'product-edit',
    path: '/product/edit/:id',
    component: ProductEdit,
    meta: {
      ...admin,
      requiredAuth: true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: Category,
    meta: {
      ...admin,
      requiredAuth: true
    }
  },
  {
    name: 'category-create',
    path: '/category/create',
    component: CategoryCreate,
    meta: {
      ...admin,
      requiredAuth: true
    }
  },
  {
    name: 'category-edit',
    path: '/category/edit/:id',
    component: CategoryEdit,
    meta: {
      ...admin,
      requiredAuth: true
    }
  }
];

export default []
  .concat(adminModule);

