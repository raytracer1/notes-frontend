import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createSpaceAction } from '../../store/reducers/space.reducer';
import SpaceEdit from "../../containers/SpaceEdit";

function CreateSpace() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createStatus = useAppSelector((state) => state.space.createSpace);
  const createErr = useAppSelector((state) => state.space.createSpaceErr);
  const space = useAppSelector((state) => state.space.space.space);

  const [imgFile, setImgFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (createStatus === 'success') {
      setInterval(() => {
        navigate(`/space/edit/${space._id}`);
      }, 2000);
    }
  // eslint-disable-next-line
  }, [createStatus, space]);

  const handleClick = () => {
    dispatch(createSpaceAction({name, description, prerequisites, keywords, imgFile}));
  }

  return (
    <SpaceEdit
      buttonTxt={'create'}
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
      disabled={createStatus === 'pending' || createStatus === 'success'}
      status={createStatus}
      error={createErr}
    />
  );
}

export default CreateSpace;