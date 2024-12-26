// app.get("/testlisting", async (req,res)=>{
//  let sampleListing = new Listing ({
//     title : "My new Villa",
//     description : "By the Beach",
//     price : 2500,
//     location : "Calunguta , Goa",
//     country : "India"
//  })
//  await sampleListing.save();
//  console.log("sample was saved");
//  res.send("successfull testing");
// })
//error handling middleware

//joi : it is npm package that is used server side schema
//we used boostrap classses to validate client side schema now for server side we use joi

<h3>Handling Deletion </h3>
<p>isme one to many wala case le rhe suppose kro ek user h aur uske multiple post h ab hmare pass 2 way h deletion k pehla ki agr user delete hota h to usse related sari post delete ho aur dusra jisme user to delete ho jata h but post bni rhteti  h to  issi cheej ko handle krne ko handling deletion khete h </p>
<ul>
we use two middelware
<li>Pre-run before the query is executed</li>
<li>Post-run after the query is executed</li>
</ul>


