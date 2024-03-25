const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors')

const db = 'mongodb+srv://kmern12345:kmern12345@futurelog.7qgiz23.mongodb.net/futurelog';

app.use(express.json());
app.use(cors())

app.listen(port, async () => {
    try {
        console.log(`Server is running at http://localhost:${port}`);
        await mongoose.connect(db);
        console.log('DB connection established');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});




//Admin Schema

const adminSchemaStucture = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
})

const Admin = mongoose.model('admin', adminSchemaStucture);


// Admin Insert

app.post('/Admin', async (req, res) => {
    try {
        const { name, email, password } = req.body
        // let admin = await Admin.findOne({ email })

        // if (admin) {
        //     return res
        //         .status(400)
        //         .json({ errors: [{ msg: 'Admin already exists' }] })
        // }

        let admin = new Admin({
            name,
            email,
            password,
        })

        await admin.save()

        res.json({ message: 'Admin inserted successfully' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// **************************************************************************************************************************************************

//Category Schema
const categorySchemaStructure = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    }

})

const Category = mongoose.model('category', categorySchemaStructure)


//category
app.post('/Category', async (req, res) => {
    try {
        console.log(req.body);
        const { categoryname } = req.body
        let category = new Category({
            categoryname
        })
        await category.save()
        res.json({ message: 'category inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


app.get('/Category', async (req, res) => {
    try {
        const categorys = await Category.find();
        console.log('category is successfully retived', categorys);
        res.json({categorys});

    } catch (error) {
        console.error('Error retrieving categoys:', error);
        res.status(500).send('Internal Server Error');
    }

})


// ************************************************************************************************************************************************

//Course Schema
const courseSchemaStructure = new mongoose.Schema({
    coursename: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})


const Course = mongoose.model('course', courseSchemaStructure)


//Course
app.post('/Course', async (req, res) => {
    console.log(req.body);
    const { coursename, categoryId } = req.body;
    try {
        let newCourse = new Course({
            coursename,
            categoryId
        })

        await newCourse.save()
        res.json({ message: 'user inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});




//popoluate-course
app.get('/Course', async (req, res) => {
    try {
        const courses = await Course.find().populate('categoryId').exec();
        console.log('successfully inserted', courses);
        res.json({courses});
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error');

    }
})


app.delete('/Course/:Id', async(req, res) => {
    try {
         const Id = req.params.Id;
        const deleteCourse =  await Course.findByIdAndDelete(Id);
        res.json({ message: 'Course deleted successfully', deleteCourse })


    } catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error');
    }
})


// ************************************************************************************************************************************************                   

//District Schema
const districtSchemaStructure = new mongoose.Schema({
    districtname: {
        type: String,
        required: true
    }

})
const District = mongoose.model('district', districtSchemaStructure)


//District
app.post('/District', async (req, res) => {
    try {
        console.log(req.body);
        //destructuring
        const { districtname } = req.body
        let district = new District({
            districtname
        })
        await district.save()
        res.json({ message: 'district inserted successfully' })

    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


app.get('/District', async (req, res) => {
    try {
        const districts = await District.find();
        console.log('Places is successfully retived', districts);
        res.json({districts});

    } catch (error) {
        console.error('Error retrieving places:', error);
        res.status(500).send('Internal Server Error');
    }

})


// ************************************************************************************************************************************************


//place Schema
const placeSchemaStructure = new mongoose.Schema({
    placename: {
        type: String,
        required: true
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'district',
        required: true
    }

})
const Place = mongoose.model('place', placeSchemaStructure)




//place
app.post('/place', async (req, res) => {
    console.log(req.body);
    const { placename, districtId } = req.body;
    try {

        let newPlace = new Place({
            placename,
            districtId
        })

        await newPlace.save()
        res.json({ message: 'user inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});


app.get('/Place', async (req, res) => {
    try {
        const places = await Place.find().populate('districtId').exec();
        console.log('Places is successfully retived', places);
        res.json({places});

    } catch (error) {
        console.error('Error retrieving places:', error);
        res.status(500).send('Internal Server Error');
    }

})


// ************************************************************************************************************************************************    


//college Schema
const collegeSchemaStructure = new mongoose.Schema({
    collegename: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    collegestatus: {
        type: Number,
        required: true
    },
    proof: {
        type: String,
        required: true,
        unique: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place',
        required: true
    }
})
const College = mongoose.model('college', collegeSchemaStructure)



//college
app.post('/college', async (req, res) => {
    const { collegename, email, password, collegestatus, address, placename, proof } = req.body;
    try {

        let place = await Place.findOne({ placename });

        if (!place) {
            place = new Place({
                placename
            });
            await place.save();
        }

        let newCollege = new College({
            collegename: collegename,
            email: email,
            password: password,
            address: address,
            collegestatus: collegestatus,
            proof: proof,
            placeId: place._id
        })

        await newCollege.save()
        res.json({ message: ' inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

//populate college
app.get('/college', async (req, res) => {
    try {
        const colleges = await College.find().populate({
            path: 'placeId',
            populate: {
                path: 'districtId',
                model: 'district'
            }
        }).exec();
        console.log('sucessfully retrived', colleges);
        res.json(colleges);

    } catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})

// ***********************************************************************************************************************************************    


//user Schema
const userSchemaStructure = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    useraddress: {
        type: String,
        required: true

    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place',
        required: true
    },
    ustatus: {
        type: Number,
        required: true

    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true

    },
    userpincode: {
        type: Number,
        required: true,
        minlength: 6

    },
    userphoto: {
        type: String,
        required: true

    }


})


const User = mongoose.model('user', userSchemaStructure)



//user
app.post('/user', async (req, res) => {
    const { username, useremail, userpassword, useraddress, ustatus, userphoto, userpincode, phone, placename } = req.body;
    try {

        let place = await Place.findOne({ placename });

        if (!place) {
            place = new Place({
                placename
            });
            await place.save();
        }

        let newUser = new User({
            username: username,
            useremail: useremail,
            userpassword: userpassword,
            useraddress: useraddress,
            ustatus: ustatus,
            userphoto: userphoto,
            userpincode: userpincode,
            phone: phone,
            placeId: place._id
        })

        await newUser.save()
        res.json({ message: 'user inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

//user Populate
app.get('/user', async (req, res) => {
    try {
        const users = await User.find().populate('placeId').exec();
        console.log('successfully retrived', users);
        res.json(users);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error');
    }
})



// *************************************************************************************************************************************************    


//collegecourse Schema
const collegecourseSchemaStructure = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    collegecoursestatus: {
        type: Number,
        required: true
    }

})
const Collegecourse = mongoose.model('collegecourse', collegecourseSchemaStructure)



//collegecourse Schema
app.post('/collegecourse', async (req, res) => {
    const { collegename, coursename, collegecoursestatus } = req.body;
    try {

        let college = await College.findOne({ collegename });
        let course = await Course.findOne({ coursename });

        if (!college && course) {
            college = new College({
                collegename
            });
            await college.save();

            course = new Course({
                coursename
            });
            await course.save();
        }

        let newcollegecourse = new Collegecourse({
            collegename: collegename,
            coursename: coursename,
            collegecoursestatus: collegecoursestatus,
            collegeId: college._id,
            courseId: course._id
        })

        await newcollegecourse.save()
        res.json({ message: 'inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});


//collegecourse populate
app.get('/collegecourse', async (req, res) => {
    try {
        const collegecourses = await Collegecourse.find().populate('collegeId', 'courseId').exec();
        console.log('successfully retrived', collegecourses);
        res.json(collegecourses);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})





// ************************************************************************************************************************************************


//complaint Schema
const complaintSchemaStructure = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true

    },
    title: {
        type: String,
        required: true,

    },
    reply: {
        type: String,
        required: true

    }

})
const Complaint = mongoose.model('complaint', complaintSchemaStructure)


//complaint
app.post('/complaint', async (req, res) => {
    const { content, title, reply, userId } = req.body;
    try {




        let newcomplaint = new Complaint({

            content: content,
            reply: reply,
            title: title,
            userId: userId
        })

        await newcomplaint.save()
        res.json({ message: 'user inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

//complaint populate
app.get('/complaint', async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('userId').exec();
        console.log('successfully retrived', complaints);
        res.json(complaints);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})


//  ***********************************************************************************************************************************************   

//feedback
const feedbackSchemaStructure = new mongoose.Schema({
    collegecourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collegecourse',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    feedbackcontent: {
        type: String,
        required: true,

    },
    count: {
        type: Number,
        required: true
    }

})
const Feedback = mongoose.model('feedback', feedbackSchemaStructure)



//feedback
app.post('/feedback', async (req, res) => {
    const { collegecourseId, userId, feedbackcontent, count } = req.body;
    try {




        let newfeedback = new Feedback({
            collegecourseId: collegecourseId,
            userId: userId,
            feedbackcontent: feedbackcontent,
            count: count
        })

        await newfeedback.save()
        res.json({ message: ' inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

//feedback populate
app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'collegecourseId').exec();
        console.log('successfully retrived', feedbacks);
        res.json(feedbacks);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})

// **************************************************************************************************************************************

//coursebooking

const coursebookingSchemaStructure = new mongoose.Schema({
    coursebookingstatus: {
        type: Number,
        required: true
    },
    coursebookingamount: {
        type: Number,
        required: true
    },
    collegecourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collegecourse',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }


})
const Coursebooking = mongoose.model('coursebooking', coursebookingSchemaStructure)




//coursebooking
app.post('/coursebooking', async (req, res) => {
    const { userId, coursebookingamount, coursebookingstatus, collegecourseId } = req.body;
    try {

        let newcoursebooking = new Coursebooking({
            coursebookingamount: coursebookingamount,
            coursebookingstatus: coursebookingstatus,
            userId: userId,
            collegecourseId: collegecourseId
        })

        await newcoursebooking.save()
        res.json({ message: ' inserted successfully' })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

//coursebooking populate
app.get('/coursebooking', async (req, res) => {
    try {
        const coursebookings = await Coursebooking.find().populate('userId', 'collegecourseId').exec();
        console.log('successfully retrived', coursebookings);
        res.json(coursebookings);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})

// *********************************************************************************************************************************************

//table agency
const agencySchemaStructure = new mongoose.Schema({
    agencyname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: true
    }

})

const Agency = mongoose.model('agency', agencySchemaStructure)


//agency
app.post('./agency', async (req, res) => {
    const { agencyname, email, password, address, photo, proof } = req.body;
    try {
        let newagency = new Agency({
            agencyname: agencyname,
            email: email,
            password: password,
            address: address,
            photo: photo,
            proof: proof

        })
        await newagency.save()
        res.json({ messege: 'insert successfully' })

    }
    catch (err) {
        console.error(err.messege)
        res.status(500).send('Server error')
    }
})

// ********************************************************************************************************************************************

//package
const packageSchemaStructure = new mongoose.Schema({
    packagename: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agency',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Package = mongoose.model('package', packageSchemaStructure);

//post package

app.post('./package', async (req, res) => {
    const { packagename, file, details, agencyId, price } = req.body;
    try {
        let newpackage = new Package({
            packagename: packagename,
            file: file,
            details: details,
            agencyId: agencyId,
            price: price
        })
        await newpackage.save()
        res.json({ message: 'inset successfully' })

    }
    catch (error) {
        console.error(err.message)
        res.status(500).send('server error')

    }
});

//package populate
app.get('./package', async (req, res) => {
    try {
        const packages = await Package.find().populate('agencyId')
        console.log('retrived successfully', packages);
        res.json(packages);
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
})


// ************************************************************************************************************************************

//request

const requestSchemaStructure = new mongoose.Schema({
    packageId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    vstatus: {
        type: Number,
        required: true
    }
})
const request = mongoose.model('request', requestSchemaStructure)

//request
app.post('./request', async (req, res) => {
    const { packageId, userId, vstatus } = req.body();
    try {
        let newrequest = new Request({
            packageId: packageId,
            userId: userId,
            vstatus: vstatus
        })
        await newrequest.save()
        res.json({ messege: 'inserted successfully' })
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }


})




//populate request
 app.get('./request',async(req,res)=>{
    try{
const requests=await Request.find().populate('packageId','userId')
console.log('retrived successfully',requests)
res.json(requests);
    
}
catch (error) {
    console.error('error', error);
    res.status(500).send('internal server error')
}
 })


//  **************************************************************************************************************************************************************8

//login Schema
const loginSchemaStructure = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const Login = mongoose.model('login', loginSchemaStructure)


//login
app.post('/Login', async (req, res) => {
    const { name, password } = req.body;
    try {
        console.log(req.body);

        let newlogin = new Login({
            name:name,
            password:password,
        })
        await newlogin.save()
        res.json({ messege: 'inserted successfully' })
    }
    catch (error) {
        console.error('error', error);
        res.status(500).send('internal server error')
    }
});


























