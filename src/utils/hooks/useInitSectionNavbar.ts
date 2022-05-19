import { useNavbarStore } from 'stores/hooks';
import { SectionEnumsType } from 'config/routes';
import { useEffect } from 'react';

const useInitSectionNavbar = <SectionEnum extends SectionEnumsType>(
  images: Record<SectionEnum, string>,
  callbacks: Record<SectionEnum, VoidFunction>
) => {
  const { setSectionButtons, resetSectionButtons } = useNavbarStore();

  useEffect(() => {
    const sectionsButtons = Object.keys(images).map((section) => ({
      section: section as SectionEnum,
      image: images[section as SectionEnum],
      callback: callbacks[section as SectionEnum],
    }));

    setSectionButtons(sectionsButtons);

    return () => {
      resetSectionButtons();
    };
  }, [images, callbacks]);
};

export default useInitSectionNavbar;
