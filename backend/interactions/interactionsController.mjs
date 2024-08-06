// controllers/interactionsController.mjs
import Interactions from './interactionsModel.mjs';

// Create or update interaction
export const createOrUpdateInteraction = async (req, res) => {
  const { username, featureName, featureId, result } = req.body;

  try {
    let interaction = await Interactions.findOne({ username });
    if (!interaction) {
      // Create a new document if the user doesn't exist
      interaction = new Interactions({
        username,
        interactions: {
          [featureName]: {
            feature_id: featureId,
            interactions: [{ result }]
          }
        }
      });
    } else {
      // Update the existing document
      if (!interaction.interactions[featureName]) {
        interaction.interactions[featureName] = {
          feature_id: featureId,
          interactions: [{ result }]
        };
      } else {
        interaction.interactions[featureName].interactions.push({ result });
      }
    }
    await interaction.save();
    res.status(200).json({ message: 'Interaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating interaction' });
  }
};

// Get all interactions for a user
export const getInteractions = async (req, res) => {
  const { username } = req.params;

  try {
    const interactions = await Interactions.findOne({ username });
    if (!interactions) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interactions' });
  }
};
