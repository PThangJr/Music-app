const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const handleToggleSubSidebar = () => {
  $(".sidebar-item-icon-dropdown").addEventListener("click", (e) => {
    $(".sidebar-item-icon-dropdown").classList.toggle(
      "sidebar-item-icon-dropdown--active"
    );
  });
};
