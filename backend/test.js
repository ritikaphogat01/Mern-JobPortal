fetch('http://localhost:3001/api/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "bakery",
    company: "xyz",
    location: "",
    salary: "",
    type: "Full-Time",
    workMode: "Onsite",
    experience: "2-5 Years",
    category: "Technology",
    description: "",
    requirements: "",
    skills: "",
    isFeatured: false
  })
})
.then(res => res.text())
.then(t => console.log('RES:', t))
.catch(err => console.error('ERR:', err));
