import {http} from './http' ; 
import {ui} from './ui' ; 


//Get post on dom load 
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add posts
document.querySelector('.post-submit').addEventListener('click' , submitPost);



//Listen for delete 
document.querySelector('#posts').addEventListener('click' , deletePost);



// get post
function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(error => console.log(error))
}


// add Post

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = { 
    title , 
    body , 
  }

  // create posts
  http.post('http://localhost:3000/posts' , data)
  .then(data =>{
    ui.showAlert('Post added!' , 'alert alert-success');
    getPosts();

    
  })
  .catch(error => console.log(error))
}


//Delete post
function deletePost(e){
  // console.log('Deleted!')

  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure ? ')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data =>{
        ui.showAlert('Post Removed' , 'alert alert-success');
        getPosts();
      })

      .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}






