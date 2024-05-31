const Details = require('./models/schemaone.js');

// Create a new detail
exports.createDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { card_id, title, short_description, background_image_url, logo_image_url } = req.body;

        if (!background_image_url || !logo_image_url) {
            return res.status(400).json({ message: 'Background image URL and logo image URL are required' });
        }

        const newDetail = new Details({
            card_id,
            title,
            short_description,
            background_image_url,
            logo_image_url
        });

        await newDetail.save();
        res.status(201).json({ message: 'Detail created successfully', detail: newDetail });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a detail by card_id
exports.deleteDetail = async (req, res) => {
    try {
        const { card_id } = req.params;
        const detail = await Details.findOneAndDelete({ card_id });
        if (!detail) {
            return res.status(404).json({ message: 'Detail not found' });
        }
        res.status(200).json({ message: 'Detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a detail by card_id
exports.updateDetail = async (req, res) => {
    try {
        const { card_id } = req.params;
        const { title, short_description, background_image_url, logo_image_url } = req.body;

        let updateFields = { title, short_description };

        if (background_image_url) {
            updateFields.background_image_url = background_image_url;
        }

        if (logo_image_url) {
            updateFields.logo_image_url = logo_image_url;
        }

        const updatedDetail = await Details.findOneAndUpdate({ card_id }, updateFields, { new: true });

        if (!updatedDetail) {
            return res.status(404).json({ message: 'Detail not found' });
        }

        res.status(200).json({ message: 'Detail updated successfully', detail: updatedDetail });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get detail by card_id
exports.getDetailsById = async (req, res) => {
    try {
        const { card_id } = req.params;
        const detail = await Details.findOne({ card_id });
        if (!detail) {
            return res.status(404).json({ message: 'Detail not found' });
        }
        res.status(200).json(detail);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all card_ids
exports.getAllIds = async (req, res) => {
    try {
        const details = await Details.find({}, 'card_id');  
        const ids = details.map(detail => detail.card_id);  
        res.status(200).json(ids);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
