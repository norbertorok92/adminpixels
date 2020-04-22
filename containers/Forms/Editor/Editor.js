import React from 'react';
import PageHeader from 'components/utility/pageHeader';
import Box from 'components/utility/box';
import LayoutWrapper from 'components/utility/layoutWrapper';
import ContentHolder from 'components/utility/contentHolder';
import IntlMessages from 'components/utility/intlMessages';
import Editor from 'components/uielements/editor';
export default function() {
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="forms.editor.header" />}</PageHeader>
      <Box>
        <ContentHolder>
          <Editor placeholder={'Write something...'} />
        </ContentHolder>
      </Box>
    </LayoutWrapper>
  );
}
