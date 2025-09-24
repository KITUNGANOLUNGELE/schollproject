const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {

    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('src/pages/admin/DashPage.vue')
      },
      {
        path: '/promotion',
        component: () => import('src/pages/admin/PromPage.vue')
      },
      {
        path: '/inscription',
        component: () => import('src/pages/admin/InscriptionPage.vue')
      },
      {
        path: '/etudiant',
        component: () => import('src/pages/admin/EtudiantPage.vue')
      },
      {
        path: '/enseignant',
        component: () => import('src/pages/admin/EnsPage.vue')
      },
      {
        path: '/enseignement',
        component: () => import('src/pages/admin/EnseignPage.vue')
      },
      {
        path: '/cours',
        component: () => import('src/pages/admin/coursPage.vue')
      }

    ]

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
