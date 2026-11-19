const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const cartButton = document.getElementById('cartButton');
let cart = [];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2300);
}

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const product = {
      name: button.dataset.name,
      price: Number(button.dataset.price)
    };
    cart.push(product);
    cartCount.textContent = cart.length;
    showToast(`${product.name} adicionada à sua sacola!`);
  });
});

const menuButton = document.getElementById('menuButton');
const siteNav = document.getElementById('siteNav');
if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Fechar' : 'Menu';
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    });
  });
}

const dockCart = document.getElementById('dockCart');
if (dockCart) {
  dockCart.addEventListener('click', () => cartButton.click());
}

cartButton.addEventListener('click', () => {
  if (!cart.length) {
    showToast('Sua sacola ainda está vazia.');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const items = cart.map(item => item.name).join(', ');
  showToast(`${cart.length} item(ns) • Total: ${total.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}`);
  console.log('Itens na sacola:', items);
});
