import React, {useEffect} from 'react';
import {register} from 'react-native-bundle-splitter';

function SvgBox({type, width, height}) {
  const HomeSvg = register({loader: () => import('../assets/svg/home.svg')});
  const HomeSelectSvg = register({
    loader: () => import('../assets/svg/homeSelect.svg'),
  });
  const HeartSvg = register({
    loader: () => import('../assets/svg/heart.svg'),
  });
  const HeartSelectSvg = register({
    loader: () => import('../assets/svg/heartSelect.svg'),
  });
  const PhotoSvg = register({
    loader: () => import('../assets/svg/photo.svg'),
  });
  const PhotoSelectSvg = register({
    loader: () => import('../assets/svg/photoSelect.svg'),
  });
  const ProfileSvg = register({
    loader: () => import('../assets/svg/profile.svg'),
  });
  const SearchSvg = register({
    loader: () => import('../assets/svg/search.svg'),
  });
  const SearchSelectSvg = register({
    loader: () => import('../assets/svg/searchSelect.svg'),
  });
  const More = register({
    loader: () => import('../assets/svg/more.svg'),
  });
  const Message = register({
    loader: () => import('../assets/svg/message.svg'),
  });
  const PaperPlane = register({
    loader: () => import('../assets/svg/paperPlane.svg'),
  });
  return (
    <>
      {type === 'HomeSvg' ? <HomeSvg width={width} height={height} /> : null}
      {type === 'HomeSelectSvg' ? (
        <HomeSelectSvg width={width} height={height} />
      ) : null}
      {type === 'HeartSvg' ? <HeartSvg width={width} height={height} /> : null}
      {type === 'HeartSelectSvg' ? (
        <HeartSelectSvg width={width} height={height} />
      ) : null}
      {type === 'PhotoSvg' ? <PhotoSvg width={width} height={height} /> : null}
      {type === 'PhotoSelectSvg' ? (
        <PhotoSelectSvg width={width} height={height} />
      ) : null}
      {type === 'ProfileSvg' ? (
        <ProfileSvg width={width} height={height} />
      ) : null}
      {type === 'SearchSvg' ? (
        <SearchSvg width={width} height={height} />
      ) : null}
      {type === 'SearchSelectSvg' ? (
        <SearchSelectSvg width={width} height={height} />
      ) : null}
      {type === 'More' ? <More width={width} height={height} /> : null}
      {type === 'Message' ? <Message width={width} height={height} /> : null}
      {type === 'PaperPlane' ? (
        <PaperPlane width={width} height={height} />
      ) : null}
    </>
  );
}

export default SvgBox;
