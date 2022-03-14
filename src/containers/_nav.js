import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Painel Geral',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['GESTÃO']
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Avisos',
    to: '/wall',
    icon: 'cil-warning',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Documentos',
    to: '/documents',
    icon: 'cil-speedometer',
  },
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Reservas',
    to: '/reservatuibs',
    icon: 'cil-calendar',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Ocorrências',
    to: '/warnings',
    icon: 'cil-bell',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Achados e Perdidos',
    to: '/foundandlost',
    icon: 'cil-lock-locked',
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['DADOS']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Usuários',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Unidades',
    to: '/units',
    icon: 'cil-home',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Áreas comuns',
    to: '/commonareas',
    icon: 'cil-paperclip',
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['CONFIGURAÇÕES']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Meu Perfil',
    to: '/profile',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sair',
    to: '/logout',
    icon: 'cil-drop',
  },

  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
