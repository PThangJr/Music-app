const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const handleTogglePlayerQueue = () => {
  $(".icon-close-player-queue").addEventListener("click", (e) => {
    $("player-queue").classList.add("player-q");
  });
};

export { handleTogglePlayerQueue };
