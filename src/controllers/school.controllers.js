import { School } from "../models/school.model.js";


export const addSchool = async (req,res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({msg: 'All fields are required.'});
    }

    const newSchool = new School({
        name,
        address,
        latitude,
        longitude
    });
    await newSchool.save();
    
    res.status(201).json({newSchool})
        
    } catch (error) {
        console.error('Error in Adding School:', error);
        res.status(500).json({ message: 'Error in Adding School' });
        
    }
}


export const listSchool = async (req,res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({msg: 'Latitude and longitude are required.'});
        }

        const schools = await School.find({}).lean();

        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            )
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);

    } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).send('An error occurred while fetching schools.');
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}













