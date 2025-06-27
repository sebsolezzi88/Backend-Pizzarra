import {Like,User,Post,Follower} from '../models/index.js'

export const followUser = async (req, res) => {
  try {
    const follower_id = req.user.id;
    const following_id = parseInt(req.params.id);

    if (follower_id === following_id) {
      return res.status(400).json({ status: 'error', message: 'You cannot follow yourself' });
    }

    const existingFollow = await Follower.findOne({ where: { follower_id, following_id } });

    if (existingFollow) {
      return res.status(400).json({ status: 'error', message: 'Already following this user' });
    }

    await Follower.create({ follower_id, following_id });

    return res.status(201).json({ status: 'success', message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

export const unfollowUser = async (req, res) => {
  try {
    const follower_id = req.user.id;
    const following_id = parseInt(req.params.id);

    const follow = await Follower.findOne({ where: { follower_id, following_id } });

    if (!follow) {
      return res.status(404).json({ status: 'error', message: 'Not following this user' });
    }

    await follow.destroy();

    return res.status(200).json({ status: 'success', message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

export const getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'Followers',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    });

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    return res.status(200).json({ status: 'success', followers: user.Followers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

export const getFollowings = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'Followings',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    });

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    return res.status(200).json({ status: 'success', followings: user.Followings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};

export const getFollowersByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      include: {
        model: User,
        as: 'Followers',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    });

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    return res.status(200).json({ status: 'success', followers: user.Followers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};

export const getFollowingsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      include: {
        model: User,
        as: 'Followings',
        attributes: ['id', 'username'],
        through: { attributes: [] }
      }
    });

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    return res.status(200).json({ status: 'success', followings: user.Followings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};