const axios = require('axios');

const BASEURL = 'http://localhost:5000/api/applications';

async function testAPI() {
    try {
        //Get all applicants
        console.log("Getting All Applications");
        const getAll = await axios.get(BASEURL);
        console.log("Total applications: ", getAll.data.length);

        //Process will make based on condition
        if (getAll.data.length == 0) {
            console.log("No application found!");
        } else {
            //Get Id of first application
            console.log("Get First Application ID");
            const testId = getAll.data[0]._id;
            console.log("First application id is: ", testId);

            //Create application
            console.log("Create Application");
            const created = await axios.post(`${BASEURL}`,
                {
                    company: 'Created Company',
                    position: 'Created Position',
                    status: 'Interview',
                    appliedDate: '2025-01-19',
                    notes: 'Created via test script'
                }
            );
            console.log("Created application: ", created.data);

            //Verify Creation
            console.log("Verify Created Application");
            const verifyCreated = await axios.get(BASEURL);
            const lastIndex = verifyCreated.data.length - 1;
            const lastId = verifyCreated.data[lastIndex]._id;
            const createdApp = verifyCreated.data.find(app => app._id === lastId);
            console.log("Created application: ", createdApp);

            //Update application
            console.log("Update Application");
            const updated = await axios.put(`${BASEURL}/${testId}`,
                {
                    company: 'Updated Company',
                    position: 'Updated Position',
                    status: 'Interview',
                    appliedDate: '2025-01-19',
                    notes: 'Updated via test script'
                }
            );
            console.log("Updated application: ", updated.data);

            //Verify application
            console.log("Verify Update Application");
            const verify = await axios.get(BASEURL);
            const updatedApp = verify.data.find(app => app._id === testId);
            console.log("Verified: ", updatedApp);

            //Delete application
            console.log("Delete Application");
            const deleted = await axios.delete(`${BASEURL}/${testId}`);
            console.log("Total applications: ", deleted.data);

            //Verify deletion
            console.log("Verify Deletion");
            const afterDelete = await axios.get(BASEURL);
            console.log("Total Application: ", afterDelete.data.length);
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message)
    }
}


testAPI();