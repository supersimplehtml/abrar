function removeTeacher(teacherId) {
    fetch(`/api/removeTeacher/${teacherId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle success, maybe update the UI
        console.log('Teacher removed successfully:', data);
        
        // Reload the page after removing a teacher
        location.reload();
    })
    .catch(error => {
        // Handle error
        console.error('Error removing teacher:', error);
    });
}
// public/javascripts/admin.js or similar

function removeStudent(studentId) {
    // Assuming you're using fetch API
    fetch(`/admin/removeStudent/${studentId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        // Handle success
        console.log(data);
        // Reload the page or update the UI as needed
        location.reload(); // Reload the page for simplicity, you might want to update the UI dynamically
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }
  
