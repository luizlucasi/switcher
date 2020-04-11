package com.riodx.switcher.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.riodx.switcher.web.rest.TestUtil;

public class AntennaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Antenna.class);
        Antenna antenna1 = new Antenna();
        antenna1.setId(1L);
        Antenna antenna2 = new Antenna();
        antenna2.setId(antenna1.getId());
        assertThat(antenna1).isEqualTo(antenna2);
        antenna2.setId(2L);
        assertThat(antenna1).isNotEqualTo(antenna2);
        antenna1.setId(null);
        assertThat(antenna1).isNotEqualTo(antenna2);
    }
}
