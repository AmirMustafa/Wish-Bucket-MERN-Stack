function deleteMe(item) {
  // console.log(item.innerText) // get the text
  const target = "http://localhost:5000/remove/" + item.innerHTML;
  console.log(target);
  fetch("http://localhost:5000/remove/" + item.innerHTML, {
    method: "delete"
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
}

function editMe(item) {
  console.log(item);
}
document.getElementById("myForm").onsubmit = e => {
  e.preventDefault();
  url = "http://localhost:5000/sent-data";

  usp = new URLSearchParams();

  for (const path of new FormData(e.target)) {
    usp.append(path[0], path[1]);
  }

  fetch(url, {
    method: "post",
    body: usp
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
};
