import validator from 'email-validator';
import md5 from 'md5';

Accounts.onCreateUser((options, user) => {
  user.username =  options.username.toLowerCase();
  
  const usernameValidator = /^[a-z0-9_]{3,16}$/;
  
  if (!usernameValidator.test(user.username)) {
    throw new Meteor.Error('400','Invalid username: Username must be alphanumerical with a minimum of 3 characters and a maximum of 16, underscore is allowed anywhere in the name.');
  }
  
//  console.log("option:", options);
//
//  throw new Meteor.Error('');
//
//  const pwdValidator = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%-_]+$/;
//
//  if (!pwdValidator.test(options.password)) {
//    throw new Meteor.Error('400','Invalid username: Username must be alphanumerical with a minimum of 3 characters and a maximum of 16, underscore is allowed anywhere in the name.');
//  }

  if (!validator.validate(user.emails[0].address)) {
    throw new Meteor.Error('400','Invalid email');
  }
  
  const invalidEmail = new RegExp([
    '@0-mail.com',
    '@1-12.nl',
    '@127-0-0-1.be',
    '@3v1l0.com',
    '@5ymail.com',
    '@aliraheem.com',
    '@aliscomputer.info',
    '@anonymousemail.me',
    '@bankofuganda.dontassrape.us',
    '@black-arm.cn',
    '@black-leg.cn',
    '@blacktattoo.cn',
    '@black-tattoo.cn',
    '@bofthew.com',
    '@bonaire.in',
    '@brefemail.com',
    '@brefmail.com',
    '@casema.org',
    '@churchofscientology.org.uk',
    '@clipmail.eu',
    '@cool.fr.nf',
    '@copcars.us',
    '@correo.blogos.net',
    '@courriel.fr.nf',
    '@definatelynotaspamtrap.com',
    '@djlol.dk',
    '@dodgit.com',
    '@dontreg.com',
    '@dupemail.com',
    '@edwinserver.se',
    '@email-jetable.com',
    '@ephemail.com',
    '@ephemail.net',
    '@ephemail.org',
    '@farifluset.mailexpire.com',
    '@filzmail.com',
    '@freenet6.de',
    '@fuzzy.weasel.net',
    '@get2mail.fr',
    '@gimme.wa.rez.se',
    '@grr.la',
    '@guerrillamail.biz',
    '@guerrillamail.com',
    '@guerrillamail.de',
    '@guerrillamail.info',
    '@guerrillamail.net',
    '@guerrillamail.org',
    '@haltospam.com',
    '@har2009.cn',
    '@hermesonline.dk',
    '@islammail.net',
    '@iximail.com',
    '@jetable.com',
    '@jetable.fr.nf',
    '@jetable.net',
    '@jetable.org',
    '@jpshop.ru',
    '@junk-yard.be',
    '@junk-yard.eu',
    '@kasmail.com',
    '@kaspop.com',
    '@klassmaster.com',
    '@kleemail.com',
    '@laughingman.ath.cx',
    '@lifebyfood.com',
    '@link2mail.net',
    '@linux.co.in',
    '@lolinternets.com',
    '@m.nonumberno.name',
    '@madcrazydesigns.com',
    '@mailbidon.com',
    '@maileater.com',
    '@mailexpire.com',
    '@mailin8r.com',
    '@mailinator.com',
    '@mailinator.net',
    '@mailinator2.com',
    '@mailincubator.com',
    '@mailnull.com',
    '@maleinhandsmint.czarkahan.net',
    '@meltmail.com',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@mt2009.com',
    '@myamail.com',
    '@mytrashmail.com',
    '@newkurdistan.com',
    '@nigerianscam.dontassrape.us',
    '@ninjas.dontassrape.us',
    '@nodns.org',
    '@no-spam.cn',
    '@nospam4.us',
    '@nospamfor.us',
    '@nyms.net',
    '@omicron.token.ro',
    '@pengodam.biz',
    '@pirates.dontassrape.us',
    '@pirazine.se',
    '@pjjkp.com',
    '@pookmail.com',
    '@pourri.fr',
    '@pyramidspel.com',
    '@realcambio.com',
    '@rhyta.com',
    '@rppkn.com',
    '@s.blackhat.lt',
    '@safetymail.info',
    '@sales.bot.nu',
    '@sales.net-freaks.com',
    '@secmail.in',
    '@secretservice24.com',
    '@secure-email.org',
    '@sendmeshit.com',
    '@sharklasers.com',
    '@shortmail.net',
    '@slarvig.se',
    '@slaskpost.cn',
    '@slaskpost.se',
    '@slop.jerkface.net',
    '@slops.lazypeople.co.uk',
    '@slops.quadrath.com',
    '@slopsbox.com',
    '@slopsbox.net',
    '@slopsbox.org',
    '@slopsbox.osocial.nu',
    '@slopsbox.se',
    '@slopsbox.slarvig.se',
    '@slopsbox.spammesenseless.dk',
    '@slopsbox.stivestoddere.dk',
    '@sogetthis.com',
    '@solidblacktattoo.cn',
    '@spailbox',
    '@spam.dontassrape.us',
    '@spam.h0lger.de',
    '@spam.hack.se',
    '@spam.la',
    '@spam.mafia-server.net',
    '@spam.su',
    '@spam.tagnard.net',
    '@spam.w00ttech.com',
    '@spam4.me',
    '@spambox.info',
    '@spambox.us',
    '@spamcorptastic.com',
    '@spamday.com',
    '@Spamfr.com',
    '@spamfree24.com',
    '@spamfree24.de',
    '@spamfree24.eu',
    '@spamfree24.info',
    '@spamfree24.net',
    '@spamfree24.org',
    '@spamgourmet.com',
    '@spamherelots.com',
    '@spammotel.com',
    '@spamout.jassi.info',
    '@tempemail.net',
    '@tempinbox.com',
    '@temporaryinbox.com',
    '@thegaybay.com',
    '@thisisnotmyrealemail.com',
    '@trash-can.eu',
    '@trash-mail.com',
    '@trashmail.net',
    '@trashymail.com',
    '@tyldd.com',
    '@tyros2.cn',
    '@vuilnisbelt.cn',
    '@watchnode.uni.cc',
    '@watertaxi.net',
    '@west.metaverseaudio.com',
    '@wh4f.org',
    '@xblogz.org',
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@yopweb.com',
    '@your.gay.cat',
    '@ziggo.ws',
    '@zynd.com'
  ].join('|'));
  
  if (invalidEmail.test(user.emails[0].address)) {
    throw new Meteor.Error('400', 'Sorry, this email is not allowed.');
  }

  user.profile = {
    contacts: [],
    blockedContacts: [],
    emailHash: md5(user.emails[0].address),
    pictureId: null,
    lastNudgeSentAt: {},
    sockets: [],
    coins: 0,
  };
  
 return user;
});

Meteor.users.after.insert(function () {
  try {
    Accounts.sendVerificationEmail(this._id);
  } catch (err){
    console.log('Verification mail error:', err);
  }
});
