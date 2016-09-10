import { Meteor } from 'meteor/meteor';
import { Invites } from '/imports/api/collections/invites';
import { Notifications, REQUEST_ACCEPTED } from '/imports/api/collections/notifications';

Meteor.methods({
  acceptInvitation: function (invitationsId) {
    const user = Meteor.user();
    const invitation = Invites.findOne(invitationsId);

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!invitation) {
      throw new Meteor.Error('404', 'Invitation not found.');
    }

    const invertedInvite = Invites.findOne({
      userId: user._id,
      targetId: invitation.userId
    });

    if (invertedInvite) {
      Invites.remove(invertedInvite._id);
    }

    Meteor.users.update(invitation.targetId, {
      $push: {
        'profile.contacts': invitation.userId
      }
    });

    Meteor.users.update(invitation.userId, {
      $push: {
        'profile.contacts': invitation.targetId
      }
    });
    
    const invitedUser = Meteor.users.findOne(invitation.targetId);

    const notification = {
      userId: invitation.userId,
      targetId: invitation.targetId,
      tag: REQUEST_ACCEPTED,
      url: '/chat/' + invitedUser.username,
      createdAt: new Date(),
      seen: false
    };

    Notifications.insert(notification);
  },
});
