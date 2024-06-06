export function openSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    window.innerWidth < 900 ? (
    document.documentElement.style.setProperty('--Sidebar-width', '240px'),
    document.documentElement.style.setProperty('--translateX', '0px')
    ) : ( 
    document.documentElement.style.setProperty('--Sidebar-width', '240px'),
    document.documentElement.style.setProperty('--translateX', '240px')
    )
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    window.innerWidth < 900 ? (
    document.documentElement.style.setProperty('--Sidebar-width', '240px'),
    document.documentElement.style.setProperty('--translateX', '-240px')
    )
    : 
    (
    document.documentElement.style.setProperty('--Sidebar-width', '58px'),
    document.documentElement.style.setProperty('--translateX', '58px')
    )


  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--SideNavigation-slideIn');
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export function openMessagesPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
  }
}

export function closeMessagesPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--MessagesPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleMessagesPane() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--MessagesPane-slideIn');
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}



export const deepGet = (obj:any, keys:string[]) => keys.reduce((xs, x) => xs?.[x] ?? null, obj);