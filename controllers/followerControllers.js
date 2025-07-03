import {Like,User,Post,Follower} from '../models/index.js'


export const getUserByUsername = async (req,res)=>{
  try {
    const userName = req.params.username;
    const userExists = await User.findOne({where:{userName}});
    
    if(!userExists){
      return res.status(404).json({ status: 'error', message: 'User not Found' });
    }
    return res.status(200).json({ status: 'success', user: userExists.username});
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

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

export const followUserByUsername = async (req, res) => {
  try {
    const targetUsername = req.params.username;
    const followerId = req.user.id;

    const targetUser = await User.findOne({ where: { username: targetUsername } });

    if (!targetUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (targetUser.id === followerId) {
      return res.status(400).json({ status: 'error', message: 'You cannot follow yourself' });
    }

    // Evitar seguir dos veces
    const alreadyFollowing = await Follower.findOne({
      where: { follower_id: followerId, following_id: targetUser.id },
    });

    if (alreadyFollowing) {
      return res.status(400).json({ status: 'error', message: 'You are already following this user' });
    }

    await Follower.create({ follower_id: followerId, following_id: targetUser.id });

    return res.status(200).json({ status: 'success', message: `You are now following ${targetUsername}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}
export const unfollowUserByUsername = async (req, res) => {
  try {
    const targetUsername = req.params.username;
    const followerId = req.user.id;

    const targetUser = await User.findOne({ where: { username: targetUsername } });

    if (!targetUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const follow = await Follower.findOne({
      where: { follower_id: followerId, following_id: targetUser.id },
    });

    if (!follow) {
      return res.status(400).json({ status: 'error', message: 'You are not following this user' });
    }

    await Follower.destroy({
      where: { follower_id: followerId, following_id: targetUser.id },
    });

    return res.status(200).json({ status: 'success', message: `You have unfollowed ${targetUsername}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
};
