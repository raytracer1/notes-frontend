import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSpaceAction, updateSpaceAction } from '../../store/reducers/space.reducer';
import SpaceEdit from "../../containers/SpaceEdit";

function EditSpace() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getSpaceStatus = useAppSelector((state) => state.space.getSpace);
  const updateStatus = useAppSelector((state) => state.space.updateSpace);
  const updateErr = useAppSelector((state) => state.space.updateSpaceErr);
  const space = useAppSelector((state) => state.space.space.space);
  const user = useAppSelector((state) => state.auth.user);

  const [imgFile, setImgFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (spaceId) {
      dispatch(getSpaceAction({spaceId: spaceId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId]);

  useEffect(() => {
    if (getSpaceStatus === 'success' || updateStatus === 'success') {
      setName(space.name);
      setDescription(space.description);
      setPrerequisites(space.prerequisites);
      setKeywords(space.keywords);
    }
    if (getSpaceStatus === 'success') {
      if (user.userName !== space.author.userName) {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [getSpaceStatus, updateStatus, space, user]);

  const handleClick = () => {
    if (spaceId) {
      dispatch(updateSpaceAction({
        spaceId, name, description, prerequisites, keywords, imgFile
      }));
    }
  }

  const changed = imgFile || name !== space.name ||
    description !== space.description || prerequisites !== space.prerequisites ||
    keywords !== space.keywords;

  return (
    <SpaceEdit
      buttonTxt={'modify'}
      imgUrl={space.imageUrl}
      imgFile={imgFile}
      setImgFile={setImgFile}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      prerequisites={prerequisites}
      setPrerequisites={setPrerequisites}
      keywords={keywords}
      setKeywords={setKeywords}
      handleClick={handleClick}
      disabled={updateStatus === 'pending'}
      buttonDisabled={!changed}
      status={updateStatus}
      error={updateErr}
    />
  )
}

export default EditSpace;